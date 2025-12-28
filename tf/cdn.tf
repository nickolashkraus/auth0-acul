# Configures Cloud CDN with a public Google Cloud Storage bucket.

resource "google_storage_bucket" "default" {
  # NOTE: Must be globally unique.
  name = "auth0-acul-${var.project_id}"

  # Use multi-region bucket. Automatically replicates objects across multiple
  # Google Cloud regions.
  # See: https://docs.cloud.google.com/storage/docs/locations
  location = "US"

  # Enable uniform bucket-level access.
  # Disables ACLs for all Google Cloud Storage resources in the bucket; access
  # to Cloud Storage resources is granted exclusively through IAM.
  # See: https://docs.cloud.google.com/storage/docs/uniform-bucket-level-access
  uniform_bucket_level_access = true

  # Standard storage is best for data that is frequently accessed ("hot" data),
  # as well as data that is stored for only brief periods of time.
  # See: https://docs.cloud.google.com/storage/docs/storage-classes
  storage_class = "STANDARD"

  # Delete bucket and all contained objects on destroy.
  force_destroy = true
}


# Make Google Cloud Storage bucket public. This is the recommended approach for public
# content. With this setting, anyone on the internet can view and list your
# objects and their metadata, excluding ACLs. To reduce the risk of unintended
# data exposure, you should typically dedicate specific Google Cloud Storage buckets
# for public objects.
#
# IMPORTANT: When objects are served from a public Google Cloud Storage bucket, by
# default they have a Cache-Control: public, max-age=3600 response header
# applied. This allows the objects to be cached when Cloud CDN is enabled.
resource "google_storage_bucket_iam_member" "default" {
  bucket = google_storage_bucket.default.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# Allocates a global static IPv4 address. The address is bound to the ALB using
# a global forwarding rule.
resource "google_compute_global_address" "default" {
  name = "auth0-acul-alb-ip"
}

# Global forwarding rules route traffic by IP address, port, and protocol to
# a load balancing configuration consisting of a target proxy, URL map, and one
# or more backend services.
#
# See: https://docs.cloud.google.com/load-balancing/docs/https#forwarding-rule
#
# NOTE: To support HTTPS, set port_range to 443, use the
# google_compute_target_https_proxy resource, and configure TLS certificates.
resource "google_compute_global_forwarding_rule" "default" {
  name                  = "auth0-acul-http-forwarding-rule"
  target                = google_compute_target_http_proxy.default.id
  ip_address            = google_compute_global_address.default.address
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "80"
  ip_protocol           = "TCP"
}


# A target proxy terminates incoming connections from clients and creates new
# connections from the load balancer to the backends.
#
# See: https://docs.cloud.google.com/load-balancing/docs/https#target-proxies
resource "google_compute_target_http_proxy" "default" {
  name    = "auth0-acul-http-proxy"
  url_map = google_compute_url_map.default.id
}

# Configures routing for the Application Load Balancer to the Google Cloud Storage
# bucket.
#
# See: https://cloud.google.com/load-balancing/docs/url-map-concepts
resource "google_compute_url_map" "default" {
  name            = "auth0-acul-url-map"
  default_service = google_compute_backend_bucket.default.id
}


# Global external Application Load Balancer using Google Cloud Storage bucket as the
# backend with Cloud CDN enabled.
#
# See: https://cloud.google.com/load-balancing/docs/backend-service
resource "google_compute_backend_bucket" "default" {
  name        = "auth0-acul-backend"
  bucket_name = google_storage_bucket.default.name
  enable_cdn  = true

  cdn_policy {
    cache_mode        = "CACHE_ALL_STATIC"
    default_ttl       = 3600
    max_ttl           = 86400
    client_ttl        = 3600
    negative_caching  = true
    serve_while_stale = 86400
  }
}
