variable "env" {
  type        = string
  description = "The environment to deploy to"
}

variable "project_name" {
  type        = string
  description = "The name of the project"
}

variable "repo_name" {
  type        = string
  description = "The name of the github repo"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to all resources"
}

variable "create_oidc" {
  type        = bool
  description = "Whether to create the OIDC auth or not"
  default     = false
}
