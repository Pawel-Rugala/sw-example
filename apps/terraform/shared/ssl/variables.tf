variable "domain_name" {
  description = "The domain name for the Route 53 hosted zone"
  type        = string
}

variable "ec2_public_ip" {
  description = "The public IP address of the EC2 instance"
  type        = string
}

variable "ec2_public_dns" {
  description = "The public DNS name of the EC2 instance"
  type        = string
}

variable "ec2_id" {
  description = "The ID of the EC2 instance"
  type        = string
}

variable "tags" {
  description = "A map of tags to add to the instance"
  default = {}
}
