import os
from PIL import Image

# A simple script to check for errors in image files.
# This was created due to an error to parse images in the training dataset.

def check_image_errors(image_path):
    for root, dirs, files in os.walk(image_path):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
                file_path = os.path.join(root, file)
                try:
                    with Image.open(file_path) as img:
                        img.verify()
                except Exception as e:
                    print(f"Error in image {file_path}: {e}")
    print("Image error checking completed.")

check_image_errors('vehicle')

# Well that didn't work. Maybe it's not the images, but the filenames.

def find_non_utf8_paths(folder):
    for root, dirs, files in os.walk(folder):
        for name in dirs + files:
            try:
                name.encode('utf-8').decode('utf-8')
            except UnicodeDecodeError as e:
                full_path = os.path.join(root, name)
                print(f"Non-UTF8 path: {full_path} — Error: {e}")
    print("Non-UTF8 path checking completed.")

find_non_utf8_paths("vehicle")


