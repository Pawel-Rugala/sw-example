#!/bin/bash

# store node version in a variable, it is used later..
NODE_VERSION=$(node -v)

cd /home/ec2-user/ || exit 1

# make .get-env.sh executable
chmod +x ./get-envs.sh

# run get-envs.sh and store env values in variable
ENV_VALUE=$(./get-envs.sh --path=/BACKEND/)
# for each line in env values, prepend ENVIRONMENT string to the line and store it in a variable
SERVICE_ENV=$(echo "$ENV_VALUE" | awk '{print "Environment="$0}')

# Write the service file to a temporary directory
cat >/tmp/app.service <<EOF
[Unit]
Description=App
After=network.target

[Service]
Type=simple
User=ec2-user
StandardOutput=file:/var/log/app/logs.log
StandardError=file:/var/log/app/logs.log
${SERVICE_ENV}
ExecStart=/.nvm/versions/node/${NODE_VERSION}/bin/node /home/ec2-user/server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

# Move the service file to /etc/systemd/system/ with sudo
sudo mv /tmp/app.service /etc/systemd/system/

# Reload the systemd daemon to read the new service file
sudo systemctl daemon-reload

# If app service is running, restart it
if sudo systemctl is-active app &>/dev/null; then
	sudo systemctl restart app
else
	# otherwise enable and start the service
	sudo systemctl enable app
	sudo systemctl start app
fi
