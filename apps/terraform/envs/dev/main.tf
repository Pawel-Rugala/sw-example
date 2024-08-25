# Regions
module "frankfurt" {
  source = "frankfurt"
  providers = {
    aws = aws.frankfurt
  }

  env          = local.env
  project_name = local.project_name
  tags         = local.tags
  repo_name    = "app"
  create_oidc  = true
}

# Domain & SSL
module "ssl" {
  source = "../../shared/ssl"
  providers = {
    aws = aws.virginia
  }

  tags           = local.tags
  ec2_public_ip  = module.frankfurt.ec2_public_ip
  ec2_public_dns = module.frankfurt.ec2_public_dns
  ec2_id         = module.frankfurt.ec2_id
  domain_name    = "be-dev.granfondorank.cc"
}

