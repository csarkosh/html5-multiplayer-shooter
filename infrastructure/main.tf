terraform {
  backend "s3" {
    bucket = "sh.csarko.terraform"
    key = "webrtc.csarko.sh/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = "us-west-2"
}

data "aws_acm_certificate" "cert" {
  domain = "csarko.sh"
}

data "aws_route53_zone" "zone" {
  name = "csarko.sh."
}
