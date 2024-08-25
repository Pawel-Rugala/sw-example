#!/bin/bash

BUCKET=$1
BRANCH=$2
COMMIT=$3
PROFILE=$4 #is optional and can be used to specify the AWS profile to use for the upload

# if the profile is not provided
if [ -z "$PROFILE" ]; then
  # use the default profile to upload the file
  echo "Uploading to s3://$BUCKET/$BRANCH/$COMMIT"
  aws s3 cp ./out/temp/backend.zip s3://$BUCKET/$BRANCH/$COMMIT/backend.zip
else
  # use the provided profile to upload the file
  echo "Uploading to s3://$BUCKET/$BRANCH/$COMMIT using profile $PROFILE"
  aws s3 cp ./out/temp/backend.zip s3://$BUCKET/$BRANCH/$COMMIT/backend.zip --profile $PROFILE
fi
