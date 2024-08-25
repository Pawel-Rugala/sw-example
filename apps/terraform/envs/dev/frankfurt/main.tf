terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">=5.0.0"
    }
  }
}

# Networking
module "vpc" {
  source = "../../../shared/vpc"

  env          = var.env
  project_name = var.project_name
  cidr_block   = "10.0.0.0/16"
  tags         = var.tags
}

module "ec2_sg" {
  source = "../../../shared/sg"

  vpc_id       = module.vpc.vpc_id
  env          = var.env
  project_name = var.project_name
  tags         = var.tags
}

# Storage
resource "aws_s3_bucket" "app" {
  bucket = "${var.project_name}-app"
}


# Compute
module "ec2_instance" {
  source = "../../../shared/ec2"

  env               = var.env
  project_name      = var.project_name
  subnet_id         = module.vpc.public_subnet_ids[0]
  security_group_id = module.ec2_sg.security_group_id
  s3_bucket_arn     = aws_s3_bucket.app.arn
  tags              = var.tags
  instance_type     = "t2.nano"
}

output "ec2_public_ip" {
  value = module.ec2_instance.ec2_public_ip
}

output "ec2_public_dns" {
  value = module.ec2_instance.ec2_public_dns
}

output "ec2_id" {
  value = module.ec2_instance.ec2_id
}


# OIDC Auth Github AWS
module "github_access" {
  source = "../../../shared/oidc"
  count  = var.create_oidc ? 1 : 0

  repo_name     = var.repo_name
  s3_bucket_arn = aws_s3_bucket.app.arn
  tags          = var.tags
}

# CodeDeploy
module "codedeploy" {
  source = "../../../shared/codedeploy"

  env          = var.env
  project_name = var.project_name
  tags         = var.tags
}
