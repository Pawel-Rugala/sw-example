output "ec2_public_ip" {
  value = aws_instance.this.public_ip
}

output "ec2_public_dns" {
  value = aws_instance.this.public_dns
}

output "ec2_id" {
  value = aws_instance.this.id
}