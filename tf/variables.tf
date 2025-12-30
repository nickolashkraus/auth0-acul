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

variable "auth0_domains" {
  description = "Auth0 domains allowed for CORS (e.g., auth.dev.functionhealth.com)"
  type        = list(string)
}
