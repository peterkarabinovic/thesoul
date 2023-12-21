#!/bin/bash

# Install dependencies
sudo yum update -y
sudo yum install docker -y
sudo yum install git -y
sudo yum install nodejs-1:18.18.2-1.amzn2023.0.1 -y
sudo npm install -g pnpm


# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" --output /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Docker start
sudo service docker start
sudo systemctl enable docker

# Add group membership for the default ec2-user 
# so you can run all docker commands without using the sudo command:
sudo usermod -a -G docker ec2-user
newgrp docker


# Clone the repository
git clone https://github.com/peterkarabinovic/thesoul.git /home/ec2-user/thesoul



