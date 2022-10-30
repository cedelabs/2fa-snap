import requests

chainId = 134
appAddress = '0x7d55ae0be7ec7d8189645f834522d9d8147865a2ef022deb006e9757567e2272'
page = 0
r = requests.get(f'https://v6.api.market.iex.ec/deals?chainId=134&appAddress=0x26c07660a5c927218dc3ac5519d2b7d35ff66ac239466e12cd2518ebcded77e3&page=21')
print(r.json()['deals'][0:2])