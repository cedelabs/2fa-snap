# IExec 2FA transaction validator
### deployed app address: 0x5D8C790a698a73f5065619F565f7ebdD5AA94E71

This is the Iexec app that validates transactions using time based 2FA.

## how to use?

### initializing Iexec env

from root directory:

```npm i -g iexec        # sudo <cmd> if needed```

```iexec init --skip-wallet```

```iexec storage init --chain bellecour```

```iexec app init``` - answer "n" to avoid replacing the iexec.json

```iexec.json``` - the most important file, Iexec app configuration for 
the successful deploy and execution

### deploy app

```iexec app deploy --chain bellecour```

```iexec app show --chain bellecour```

### now it's time to set up the authenticator

Application has 2 methods:
- setup
- signature

to setup the authenticator, you have to get a secret code for your account.
You can get it by calling:

```shell
exec app run --args "setup" --watch --chain bellecour
```

```bash
iexec app run --args "signature 234124" --watch --chain bellecour
```

to check the output:
```shell
iexec task show <taskid> --download my-app-result --chain bellecour  \
    && unzip my-app-result.zip -d my-app-result
```
