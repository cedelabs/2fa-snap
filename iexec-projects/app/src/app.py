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


def totp(key, time_step=30, digits=6, digest='sha1'):
    return hotp(key, int(time.time() / time_step), digits, digest)


def hotp(key, counter, digits=6, digest='sha1'):
    key = base64.b32decode(key.upper() + '=' * ((8 - len(key)) % 8))
    counter = struct.pack('>Q', counter)
    mac = hmac.new(key, counter, digest).digest()
    offset = mac[-1] & 0x0f
    binary = struct.unpack('>L', mac[offset:offset + 4])[0] & 0x7fffffff
    return str(binary)[-digits:].zfill(digits)


def setup():
    secret = secrets.token_urlsafe(16)
    put_secret_in_storage(secret)
    send_secret(secret)


def put_secret_in_storage(secret: str):
    pass


def send_secret(secret: str):
    pass


def get_secret_from_storage(pubkey: str):
    pass


def is_valid(client_public_key, totp_user):
    # secret = get_secret_from_storage(client_public_key)
    secret = "TESTSECRET"
    totp_server = totp(secret)
    # output 
    with open(iexec_out + '/result.txt', 'w+') as f:
        f.write(totp_server)
        print(totp_server)

    if totp_server == totp_user:
        sign_transaction()


def sign_transaction():
    pass