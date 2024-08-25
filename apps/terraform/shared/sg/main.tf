data "aws_ip_ranges" "european_ec2" {
  regions  = ["eu-central-1"]
  services = ["ec2_instance_connect"]
}

resource "aws_security_group" "ec2" {
  name_prefix = "ec2-"
  vpc_id      = var.vpc_id
  # http 3000
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ssh 22
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = data.aws_ip_ranges.european_ec2.cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, {
    Name = "${var.env}-${var.project_name}"
  })
}
