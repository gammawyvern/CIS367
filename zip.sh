#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <folder_name>"
  exit 1
fi

input_folder="$1"
output_folder="finished"
library_folder="libraries"

# Remove trailing slash if present
input_folder=$(echo "$input_folder" | sed 's:/$::')


# Check if the input folder exists
if [ ! -d "$input_folder" ]; then
  echo "Error: Folder '$input_folder' not found."
  exit 1
fi

# Check if the input folder exists
if [ ! -d "$library_folder" ]; then
  echo "Error: Folder '$library_folder' not found."
  exit 1
fi

# Create the output folder if it doesn't exist
mkdir -p "$output_folder"

Zip the input folder and library folder
zip -r "$output_folder/$input_folder.zip" "$input_folder" "$library_folder"

echo "Zip operation completed. Output available in '$output_folder/$input_folder.zip'."

