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

variable "vpc_id" {
  description = "The VPC ID"
}