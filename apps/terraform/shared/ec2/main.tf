locals {
  userdata = templatefile("${path.module}/instance-setup.sh", {
    ssm_cloudwatch_config = aws_ssm_parameter.cloudwatch_config.name
  })
}

data "aws_ami" "amzn-linux-2023-ami" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

data "aws_iam_policy_document" "s3_readonly_policy" {
  statement {
    actions = [
      "s3:Get*",
      "s3:List*"
    ]

    resources = ["${var.s3_bucket_arn}/*"]
  }
}

data "aws_iam_policy_document" "ssm_readonly_policy" {
  statement {
    actions = [
      "ssm:Describe*",
      "ssm:Get*",
      "ssm:List*"
    ]

    resources = [
      "*"
    ]
  }
}

data "aws_iam_policy_document" "cloudwatch_write_policy" {
  statement {
    actions = [
      "cloudwatch:PutMetricData",
      "ec2:DescribeVolumes",
      "ec2:DescribeTags",
      "logs:PutLogEvents",
      "logs:PutRetentionPolicy",
      "logs:DescribeLogStreams",
      "logs:DescribeLogGroups",
      "logs:CreateLogStream",
      "logs:CreateLogGroup",
    ]

    resources = [
      "*"
    ]
  }
}

data "aws_iam_policy_document" "assume_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}


module "instance_role" {
  source = "../iam"

  role_name          = "instance_role"
  role_description   = "Role for EC2 instances"
  trusted_entity     = data.aws_iam_policy_document.assume_policy.json
  policy_name        = "s3_ssm_cloudwatch"
  policy_description = "Policy for read only access to s3 and ssm and write access cloudwatch"
  policy_documents = [
    data.aws_iam_policy_document.cloudwatch_write_policy.json,
    data.aws_iam_policy_document.s3_readonly_policy.json,
    data.aws_iam_policy_document.ssm_readonly_policy.json
  ]
  tags = var.tags
}

resource "aws_iam_instance_profile" "this" {
  name = "instance_profile"
  role = module.instance_role.iam_role
}

resource "aws_ssm_parameter" "cloudwatch_config" {
  description = "Cloudwatch agent custom config"
  name        = "/cloudwatch-agent/config"
  type        = "String"
  value       = file("${path.module}/cw-agent-config.json")

}

resource "aws_instance" "this" {
  ami           = data.aws_ami.amzn-linux-2023-ami.id
  instance_type = var.instance_type
  user_data     = local.userdata

  subnet_id              = var.subnet_id
  vpc_security_group_ids = [var.security_group_id]
  iam_instance_profile   = aws_iam_instance_profile.this.name

  monitoring                  = var.enable_monitoring
  associate_public_ip_address = var.enable_public_ip

  tags = merge(
    var.tags,
    {
      Name = "${var.env}-${var.project_name}"
    }
  )

  lifecycle {
    ignore_changes = [ami]
  }
  depends_on = [ aws_ssm_parameter.cloudwatch_config ]
}
