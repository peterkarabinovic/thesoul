resource "aws_security_group" "thesoul-sg" {
  name = "thesoul-sg"

  ingress {
    from_port   = 22
    protocol    = "tcp"
    to_port     = 22
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    protocol    = "tcp"
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}


resource "aws_instance" "thesoul_server" {
  ami           = "ami-0d0b8f748d0b16f5e" // Amazon Linux 2023 AMI
  instance_type = "t4g.micro"             // 2 vCPU 1 GB RAM , t4g.small - 2 vCPU 2 GB RAM
  tags = {
    Name = "thesoul-online"
  }
  user_data = file("${path.module}/../scripts/user-data.sh")
  security_groups = [aws_security_group.thesoul-sg.name]
  key_name = "thesoul-online"
  associate_public_ip_address = true // TODO: use Elastic IP

  provisioner "file" {
    source = "${path.module}/docker-compose.yml"
    destination = "/home/ec2-user/docker-compose.yml"
    connection {
      type = "ssh"
      user = "ec2-user"
      private_key = file("~/.ssh/thesoul-online.pem")
      host = self.public_ip
    }
  }
}


output "instance_ip" {
  value       = "${aws_instance.thesoul_server.public_ip}"
  description = "EC2 public IP" 
}