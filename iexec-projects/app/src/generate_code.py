
import base64
import hmac
import struct
import sys
import os
import json
import time

def totp(key, time_step=30, digits=6, digest='sha1'):
<<<<<<< HEAD
    return hotp(key, int(time.time() / time_step) + 1, digits, digest)
=======
    return hotp(key, int(time.time() / time_step), digits, digest)
>>>>>>> b23511f881a28d6c214b1870a3a011e6f60d8da1


def hotp(key, counter, digits=6, digest='sha1'):
    key = base64.b32decode(key.upper() + '=' * ((8 - len(key)) % 8))
    counter = struct.pack('>Q', counter)
    mac = hmac.new(key, counter, digest).digest()
    offset = mac[-1] & 0x0f
    binary = struct.unpack('>L', mac[offset:offset + 4])[0] & 0x7fffffff
    return str(binary)[-digits:].zfill(digits)

<<<<<<< HEAD

=======
>>>>>>> b23511f881a28d6c214b1870a3a011e6f60d8da1
print(totp('ETHPRICE'))