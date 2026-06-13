import os
for f in sorted(os.listdir('.')):
    if not f.endswith('.jpg'):
        continue
    with open(f, 'rb') as fh:
        data = fh.read(16)
    print(f'{f}: {data.hex()}')
