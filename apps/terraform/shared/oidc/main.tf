#variable "create_oidc_provider" {
#  description = "Whether to create an OIDC provider for Github Actions. This is required for the Github Actions to assume the role."
#  type        = bool
#  default     = true
#}

variable "s3_bucket_arn" {
  description = "The ARN of the S3 bucket to grant access to."
  type        = string
}

variable "repo_name" {
  description = "The name of the repository to grant access to."
  type        = string
}

variable "tags" {
  description = "A map of tags to add to the instance"
  default = {}
}

data "tls_certificate" "this" {
  url = "https://token.actions.githubusercontent.com"
}

resource "aws_iam_openid_connect_provider" "this" {
  #  count           = var.create_oidc_provider ? 1 : 0
  #  provider        = aws.frankfurt
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [
    data.tls_certificate.this.certificates[0].sha1_fingerprint,
    data.tls_certificate.this.certificates[1].sha1_fingerprint // Github has 2 certificates now
  ]
  url = "https://token.actions.githubusercontent.com"
}

data "aws_iam_policy_document" "s3_write_policy" {
  statement {
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:ListBucket",
    ]

    resources = ["${var.s3_bucket_arn}/*"]
  }
}

data "aws_iam_policy_document" "codedeploy_developer_policy" {
  statement {
    actions = [
      "codedeploy:Batch*",
      "codedeploy:CreateDeployment",
      "codedeploy:Get*",
      "codedeploy:List*",
      "codedeploy:RegisterApplicationRevision"
    ]

    resources = ["*"]
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

data "aws_iam_policy_document" "assume" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [
        aws_iam_openid_connect_provider.this.arn
      ]
    }

    condition {
      test     = "ForAnyValue:StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:masterborn/${var.repo_name}:*"]
    }
  }
}

module "github_role" {
  source = "../iam"
  #  count  = var.create_oidc_provider ? 1 : 0

  role_name          = "github_role"
  role_description   = "Role for Github to access aws s3 codedeploy ssm"
  trusted_entity     = data.aws_iam_policy_document.assume.json
  policy_name        = "s3_codedeploy_write_read_ssm_policy"
  policy_description = "Policy for write access to s3 and codedeploy and read ssm"
  policy_documents   = [
    data.aws_iam_policy_document.s3_write_policy.json,
    data.aws_iam_policy_document.codedeploy_developer_policy.json,
    data.aws_iam_policy_document.ssm_readonly_policy.json
  ]
  tags = var.tags
}