#!/bin/bash
sudo yum update -y

# Install Docker and start
sudo yum install docker -y
sudo service docker start
sudo systemctl enable docker

# Add group membership for the default ec2-user 
# so you can run all docker commands without using the sudo command:
sudo usermod -a -G docker ec2-user
newgrp docker


# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" --output /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose


# Install Git
sudo yum install git -y

# Clone the repository



