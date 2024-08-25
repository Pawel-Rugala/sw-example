variable "instance_type" {
  description = "The type of instance to start"
  default     = "t2.micro"
}

variable "subnet_id" {
  description = "The subnet id to start the instance in"
}

variable "security_group_id" {
  description = "The security group id to start the instance"
}

variable "enable_monitoring" {
  description = "Monitoring of the instacne should be enable"
  default     = false
}

variable "enable_public_ip" {
  description = "The instance should have a public ip"
  default     = true
}

variable "env" {
  description = "The environment to start the instance in"
}

variable "project_name" {
  description = "The project to start the instance in"
}

variable "tags" {
  description = "A map of tags to add to the instance"
  default     = {}
}

variable "s3_bucket_arn" {
  description = "The ARN of the S3 bucket to allow access to"
}