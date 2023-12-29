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
  user_data = file("${path.module}/user-data.sh")
  security_groups = [aws_security_group.thesoul-sg.name]
  key_name = "thesoul-online"
  associate_public_ip_address = true // TODO: use Elastic IP
  iam_instance_profile = aws_iam_instance_profile.s3_access_profile.name
  root_block_device {
    volume_size = 12
  }
}

# Access to S3
resource "aws_iam_role" "s3_access_role" {
  name = "S3AccessRole"

  assume_role_policy = jsonencode({
    "Version" = "2012-10-17"
    "Statement" = [
      {
        "Action" = "sts:AssumeRole"
        "Effect" = "Allow"
        "Sid"    = ""
        "Principal" = {
          "Service" = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "s3_access_policy" {
  name = "S3AccessPolicy"
  role = aws_iam_role.s3_access_role.id

  policy = jsonencode({
    "Version" = "2012-10-17"
    "Statement" = [
      {
        "Action" = [
          "s3:*",
        ]
        "Effect"  = "Allow"
        "Resource" = [
          "arn:aws:s3:::the-soul",
          "arn:aws:s3:::the-soul/*"
        ]
      }
    ]
  }) 
}

resource "aws_iam_instance_profile" "s3_access_profile" {
  name = "S3AccessProfile"
  role = aws_iam_role.s3_access_role.name
}


output "instance_ip" {
  value       = "${aws_instance.thesoul_server.public_ip}"
  description = "EC2 public IP" 
}