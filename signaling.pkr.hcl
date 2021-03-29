locals {
  ami_name = "signaling"
  timestamp = regex_replace(timestamp(), "[- TZ:]", "")
}

source "amazon-ebs" "signaling" {
  ami_name = "${local.ami_name}-${local.timestamp}"
  instance_type = "t4g.nano"
  region = "us-west-2"
  source_ami_filter {
    filters = {
      name = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-arm64-server-*"
      root-device-type = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners = ["099720109477"]
  }
  ssh_username = "ubuntu"
}

build {
  sources = ["source.amazon-ebs.signaling"]
  # Transfer jar
  provisioner "file" {
    source = "signaling/build/libs/"
    destination = "~"
  }
  # Setup Java 11 Corretto
  provisioner "shell" {
    inline = [
      "sudo apt-get update",
      "sudo add-apt-repository -y ppa:openjdk-r/ppa",
      "sudo apt-get install -y java-common",
      "wget https://corretto.aws/downloads/latest/amazon-corretto-11-aarch64-linux-jdk.deb",
      "sudo dpkg --install amazon-corretto-11-aarch64-linux-jdk.deb",
      "rm amazon-corretto-11-aarch64-linux-jdk.deb",
    ]
  }
}
