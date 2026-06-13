from PIL import Image
import os
for f in sorted(os.listdir('.')):
    if f.endswith('.jpg'):
        img = Image.open(f)
        print(f'{f}: {img.size}')
