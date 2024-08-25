variable "role_name" {
  description = "The name of the role to create"
  type        = string
}

variable "role_description" {
  description = "The description of the role to create"
  type        = string
}

variable "trusted_entity" {
  description = "The entity that is allowed to assume the role"
}

variable "policy_name" {
  description = "The name of the policy to create"
  type        = string
}

variable "policy_description" {
  description = "The description of the policy to create"
  type        = string
}

variable "policy_documents" {
  description = "The policy documents to attach to the role"
}

variable "tags" {
  description = "A map of tags to add to the instance"
  default     = {}
}
