#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <assignment_name>"
  exit 1
fi

assignment_name="$1"
finished_folder="finished"
testing_folder="testing"

# Remove trailing slash if present
assignment_name=$(echo "$assignment_name" | sed 's:/$::')

# Check if the assignment zip file exists in the finished folder
zip_file="$finished_folder/$assignment_name.zip"
if [ ! -f "$zip_file" ]; then
  echo "Error: Zip file '$zip_file' not found in '$finished_folder'."
  exit 1
fi

# Create or reset the testing folder
rm -rf "$testing_folder"
mkdir -p "$testing_folder"

# Unzip the assignment into the testing folder
unzip "$zip_file" -d "$testing_folder"

echo "Unzip operation completed. Assignment '$assignment_name' available in '$testing_folder'."

