variable "env" {
  description = "The environment in which the resources are created."
  type        = string
}

variable "project_name" {
  description = "The name of the project."
  type        = string
}

variable "cidr_block" {
  description = "The CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "no_of_azs" {
  description = "The number of availability zones to use."
  type        = number
  default     = 1
}

variable "tags" {
  description = "A map of tags to add to the instance"
  default     = {}
}

