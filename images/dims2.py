import os, struct

for f in sorted(os.listdir('.')):
    if not f.endswith('.jpg'):
        continue
    with open(f, 'rb') as fh:
        data = fh.read(2)
        if data != b'\xff\xd8':
            print(f'{f}: not jpg')
            continue
        while True:
            b = fh.read(1)
            if b != b'\xff':
                break
            marker = fh.read(1)
            if marker == b'\xd9':  # EOI
                break
            if marker == b'\xd8':  # SOI
                continue
            if marker == b'\x00':  # padding
                continue
            # read length
            len_bytes = fh.read(2)
            if len(len_bytes) != 2:
                break
            length = struct.unpack('>H', len_bytes)[0]
            if length < 2:
                break
            if marker in b'\xc0\xc1\xc2\xc3\xc4\xc5\xc6\xc7':
                # SOF marker
                fh.read(1)  # precision
                h, w = struct.unpack('>HH', fh.read(4))
                print(f'{f}: {w} x {h}')
                break
            else:
                # skip segment
                fh.read(length - 2)
