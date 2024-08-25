#!/bin/bash

# Install CodeDeploy Agent
sudo yum update -y
sudo yum install -y ruby
sudo yum install -y wget
cd /home/ec2-user
wget https://aws-codedeploy-eu-central-1.s3.eu-central-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto

# Install NVM / node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install v20

# Install PNPM globally
npm install -g pnpm

# Share node for all users
cat <<EOF >> /home/ec2-user/.bashrc
export NVM_DIR="/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
EOF

# To make sudo node working
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npx" "/usr/local/bin/npx"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/pnpm" "/usr/local/bin/pnpm"

# Create dir for logs
sudo mkdir -p /var/log/app

# Install CloudWatch Agent on Amazon Linux 3
sudo yum install -y amazon-cloudwatch-agent
sudo yum -y install collectd
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c ssm:${ssm_cloudwatch_config} -s

# Optional: Verify installations
echo "Node.js version: $(node -v)"
echo "PNPM version: $(pnpm -v)"
echo "CloudWatch Agent version: $(/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent --version)"
echo "CloudWatch Agent status: $(/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a status)"
