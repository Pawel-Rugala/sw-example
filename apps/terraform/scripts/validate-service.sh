#!/bin/bash

# it's very simple... but it checks if the service is running or not
if systemctl is-active app &> /dev/null; then
  echo "Service is running"
else
  echo "Service is not running"
  exit 1
fi

# Wait 5 seconds for the service to start (sometimes it takes a while)
sleep 5

# Check HTTP response
if curl -sSf http://localhost:3000/v1/ping &> /dev/null; then
  echo "HTTP response is successful"
  exit 0
else
  echo "Failed to get HTTP response"
  exit 1
fi
