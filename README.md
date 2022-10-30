## Pastel de Meta 
is a decentralized 2FA system to get a higher level of security when interacting with the Ethereum space through Metamask.


## This project contains several modules:
- iexec-projects - 2fa verifier running on a decentralized computation platform iExec
- safe-2fa-snap - MM snap with a dApp to setup and use the 2fa on any dApp
- metamask extension - we customized MM extension in order to put the input field on the confirmation page
- 2fa-service - AWS service for a demo (iExec is down) 

To launch Metamask Extension:
- ```nvm use v16.10.0```
- ```yarn```
- ```yarn setup``` 
- ```yarn start --build-type=flask``` 

To launch safe-2fa-snap:
- ```yarn```
- ```yarn start``` 

To deploy and launch AWS services:
- ```yarn build && cdk deploy```