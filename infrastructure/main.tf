terraform {
  backend "s3" {
    bucket = "sh.csarko.terraform"
    key = "webrtc.csarko.sh/terraform.tfstate"
    region = "us-west-2"
  }
}

locals {
  tag_name = "html5-multiplayer-shooter"
}

provider "aws" {
  region = "us-west-2"
}

provider "aws" {
  alias = "us-east-1"
  region = "us-east-1"
}

data "aws_acm_certificate" "cert" {
  domain = "csarko.sh"
  provider = aws.us-east-1
}

data "aws_route53_zone" "zone" {
  name = "csarko.sh."
}

data "aws_ami" "ami" {
  most_recent = true

  filter {
    name = "name"
    values = ["signaling-*"]
  }

  owners = ["self"]
}

resource "aws_security_group" "group" {
  name = "${local.tag_name}-ec2-sg"
  ingress {
    from_port = 8080
    protocol = "TCP"
    to_port = 8080
    cidr_blocks = ["216.243.0.0/16"]
  }
  ingress {
    from_port = 22
    protocol = "TCP"
    to_port = 22
    cidr_blocks = ["216.243.0.0/16"]
  }
}

resource "aws_instance" "server" {
  ami = data.aws_ami.ami.id
  instance_type = "t4g.nano"
  key_name = "cyrus-test-2"
  vpc_security_group_ids = [aws_security_group.group.id]
  tags = {
    Name = local.tag_name
  }
  user_data = <<-EOF
    #!/bin/bash
    sudo systemctl start signaling.service
  EOF
}