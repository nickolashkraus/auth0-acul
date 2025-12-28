output "load_balancer_ip" {
  description = "Global IP address of the external Application Load Balancer (ALB)"
  value       = google_compute_global_address.default.address
}
