#!/bin/bash

# check if in root folder if not change one folder up
if [ ! -f "pnpm-workspace.yaml" ]; then
  cd ..
fi

# remove temp directory
rm -rf out/temp/

# create temp directory
mkdir -p out/temp/
mkdir -p out/temp/docs

# go to temp directory
cd out/temp/ || exit 1

# zip files
zip -r backend.zip ./