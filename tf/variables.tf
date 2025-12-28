variable "project_id" {
  description = "Google Cloud project ID"
  type        = string
}

variable "region" {
  description = "Google Cloud region"
  type        = string
  default     = "us-central1"
}

variable "cdn_domain" {
  description = "Custom domain for the Cloud CDN endpoint (managed certificate)"
  type        = string
}
