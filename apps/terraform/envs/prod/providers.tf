terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">=5.0.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = ">=3.0.0"
    }
  }

  backend "s3" {
    bucket  = "app-prd-terraform-state"
    key     = "terraform.tfstate"
    region  = "eu-central-1"
    profile = "app-prod"
  }
}

locals {
  project_name = "app"
  env          = "prod"
  profile      = "app-prod"
  tags = {
    ManagedBy = "terraform"
    Client    = "MasterBorn"
    env       = local.env
    project   = local.project_name
  }
}

provider "aws" {
  region  = "eu-central-1"
  profile = "app-prod"
  alias   = "frankfurt"
}

provider "aws" {
  region  = "us-east-1"
  profile = "app-prod"
  alias   = "virginia"
}
