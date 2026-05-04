terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}


resource "aws_security_group" "ssh_access" {
  name        = "ssh-access"
  description = "Allow SSH inbound traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9000
    to_port     = 9000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami                         = "ami-091138d0f0d41ff90"
  instance_type               = "t3.micro"
  vpc_security_group_ids      = [aws_security_group.ssh_access.id]
  associate_public_ip_address = true
  key_name                    = "cloud-observability-lab"

  tags = {
    Name = "cloud-observability-lab"
  }
}

output "public_ip" {
  value = aws_instance.web.public_ip
}

