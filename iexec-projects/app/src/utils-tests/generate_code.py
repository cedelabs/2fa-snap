
import base64
import hmac
import struct
import sys
import os
import json
import time

def totp(key, time_step=30, digits=6, digest='sha1'):
    return hotp(key, int(time.time() / time_step) + 1, digits, digest)


def hotp(key, counter, digits=6, digest='sha1'):
    key = base64.b32decode(key.upper() + '=' * ((8 - len(key)) % 8))
    counter = struct.pack('>Q', counter)
    mac = hmac.new(key, counter, digest).digest()
    offset = mac[-1] & 0x0f
    binary = struct.unpack('>L', mac[offset:offset + 4])[0] & 0x7fffffff
    return str(binary)[-digits:].zfill(digits)

print(totp('ETHPRICE'))

print(1 in [1, 2, 4])