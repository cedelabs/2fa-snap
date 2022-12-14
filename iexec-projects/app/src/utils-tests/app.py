# --- setup ---

import base64
import hmac
import struct
import sys
import os
import json
import time
import secrets

iexec_out = os.environ['IEXEC_OUT']
iexec_in = os.environ['IEXEC_IN']

HARDCODED_PUB_KEY_USER = '0x5e7Fc13FCc408F4d89C8E441EC5eCb1d3D8B2850'
SECRET_HARDCODED_USER = 'ETHPRICE'

method = sys.argv[1]


def totp(key, time_step=30, digits=6, digest='sha1'):
    totp_a = hotp(key, int(time.time() / time_step), digits, digest)
    totp_b = hotp(key, int(time.time() / time_step) - 1, digits, digest)
    totp_c = hotp(key, int(time.time() / time_step) - 2, digits, digest)
    totp_d = hotp(key, int(time.time() / time_step) - 4, digits, digest)
    totp_e = hotp(key, int(time.time() / time_step) - 5, digits, digest)
    return [totp_a, totp_b, totp_c, totp_d, totp_e]


def hotp(key, counter, digits=6, digest='sha1'):
    key = base64.b32decode(key.upper() + '=' * ((8 - len(key)) % 8))
    counter = struct.pack('>Q', counter)
    mac = hmac.new(key, counter, digest).digest()
    offset = mac[-1] & 0x0f
    binary = struct.unpack('>L', mac[offset:offset + 4])[0] & 0x7fffffff
    return str(binary)[-digits:].zfill(digits)


def setup(pub_key_user=HARDCODED_PUB_KEY_USER):
    secret = SECRET_HARDCODED_USER
    with open(iexec_out + '/result.txt', 'w+') as f:
        f.write(secret)
        print(secret)


def signature(totp_user):
    totps_server = totp(SECRET_HARDCODED_USER)
    status = 'INVALID'
    totps_server = [int(server_totp) for server_totp in totps_server]
    [print(server_totp) for server_totp in totps_server]
    if totp_user in totps_server:
        status = 'VALID'
    with open(iexec_out + '/result.txt', 'w+') as f:
        f.write(status)
        print(status)


# --- execution ---
if method == 'setup':
    setup()

if method == 'signature':
    user_totp = sys.argv[2]
    signature(int(user_totp))


with open(iexec_out + '/computed.json', 'w+') as f:
    json.dump({ "deterministic-output-path" : iexec_out + '/result.txt' }, f)
    
    
