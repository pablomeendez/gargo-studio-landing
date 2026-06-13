import os, struct
for f in sorted(os.listdir('.')):
    if not f.endswith('.jpg'): continue
    with open(f, 'rb') as fh:
        d = fh.read(2)
        if d != b'\xff\xd8':
            print(f'{f}: not jpg')
            continue
        while True:
            d = fh.read(2)
            if d != b'\xff':
                break
            marker = fh.read(1)
            if marker in b'\xd8\xd9\x00':
                break
            if marker in b'\xd0\xd1\xd2\xd3\xd4\xd5\xd6\xd7':
                continue
            if marker in b'\xe0\xe1\xe2':
                fh.read(struct.unpack('>H', fh.read(2))[0] - 2)
                continue
            if marker in b'\xc0\xc1\xc2\xc3\xc4\xc5\xc6\xc7':
                fh.read(3)
                h, w = struct.unpack('>HH', fh.read(4))
                print(f'{f}: {w} x {h}')
                break
            else:
                l = struct.unpack('>H', fh.read(2))[0] - 2
                fh.read(l)
