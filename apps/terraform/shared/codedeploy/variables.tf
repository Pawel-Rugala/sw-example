variable "project_name" {
  description = "The name of the project."
  type        = string
}

variable "env" {
  description = "The environment to start the instance in"
}

variable "tags" {
  description = "A map of tags to add to the instance"
  default     = {}
}
