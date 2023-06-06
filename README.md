<div align="center">
<p>
  <sup>
    <a href="https://github.com/sponsors/motdotla">dotenv-vault-decrypt is inherited from Dotenv</a>
  </sup>
</p>
<sup>Special thanks to:</sup>
<br>
<br>
<a href="https://www.warp.dev/?utm_source=github&utm_medium=referral&utm_campaign=dotenv_p_20220831">
  <div>
    <img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg" alt="dotenv" width="100" />

  </div>
  <b>Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.</b>
  
</a>
<br/>

<div>
    <sup>Dotenv Vault Decrypt helps to decrypt the vault keys into environment variables. [Stop Adding Multiple Environment Variables on Development Platform i.e. Gitlab/Netlify/BitBucket]</sup>
  </div>
<sup>SUPPORTED</sup>

[![My Skills](https://skillicons.dev/icons?i=react,vue,nextjs,angular,svelte)](https://skillicons.dev)

<br>
<hr>
<br>
</div>

# dotenv-vault-decrypt

Dotenv Vault Decrypt package helps to generate `.env` (i.e. environment variables) file [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env) at build time for frontend framework/library by encrypting vault keys using one of the specific environment key.

![npm version](https://img.shields.io/npm/v/dotenv-vault-decrypt.svg?style=flat-square)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=dotenv-vault-decrypt&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=dotenv-vault-decrypt)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/axios?style=flat-square)](https://bundlephobia.com/package/axios@latest)
[![npm downloads](https://img.shields.io/npm/dm/dotenv-vault-decrypt.svg?style=flat-square)](https://npm-stat.com/charts.html?package=dotenv-vault-decrypt) [![npm version](https://badge.fury.io/js/dotenv-vault-decrypt.svg)](https://badge.fury.io/js/dotenv-vault-decrypt)

- [🌱 Install](#-install)
- [🏗️ Usage (.env)](#%EF%B8%8F-usage)
- [🚀 Deploying (.env.vault) 🆕](#-deploying)
- [🌴 How it Works](#-examples)

## 🌱 Install

```bash
# install locally (recommended)
npm install dotenv-vault-decrypt --save
```

Or installing with yarn? `yarn add dotenv-vault-decrypt`

## 🌴 How it Works

**Note: Secure environment variables technique.**

Don't scatter your secrets across multiple platforms and tools. Use a `.env.vault` file.

The `.env.vault` file encrypts your secrets and decrypts them just-in-time on boot of your application. It uses a `DOTENV_KEY` environment variable that you set on your cloud platform or server. If there is a secrets breach, an attacker only gains access to your decryption key, not your secrets. They would additionally have to gain access to your codebase, find your .env.vault file, and decrypt it to get your secrets. This is much harder and more time consuming for an attacker.

It works in 3 easy steps.

### 1. Create .env.ENVIRONMENT files

In addition to your `.env` (development) file, create a `.env.ci`, `.env.staging`, and `.env.production` file.

(Have a custom environment? Just append it's name. For example, `.env.prod`.)

Put your respective secrets in each of those files, just like you always have with your `.env` files. These files should NOT be committed to code.

### 2. Generate .env.vault file

Run the build command to generate your `.env.vault` file.

```
$ npx dotenv-vault local build
```

This command will read the contents of each of your `.env.*` files, encrypt them, and inject the encrypted versions into your `.env.vault` file. For example:

```
# .env.vault (generated with npx dotenv-vault local build)
DOTENV_VAULT_DEVELOPMENT="X/GOMD7h/Fygjyq3+K2zbdyTBUBVA+mLivaSebqDMnLAencDGu9YvJji"
DOTENV_VAULT_CI="SNnKvHTezcd0B8L+81lhcig+6GfkRxnlrgS1GG/2tJZ7KghOEJnM"
DOTENV_VAULT_PRODUCTION="FudgivxdMrCKOKUeN+QieuCAoGiC2MstXL8JU6Pp4ILYu9wEwfqe4ne3e2jcVys="
DOTENV_VAULT_STAGING="CZXrvrTusPLJlgm62uEppwCKZt6zEr4TGwlP8Z0McJd7I8KBF522JnhT9/8="
```

Commit your `.env.vault` file safely to code. It SHOULD be committed to code.

### 3. Set DOTENV_KEY

The build command also created a `.env.keys` file for you. This is where your `DOTENV_KEY` decryption keys live per environment.

```
# DOTENV_KEYs (generated with npx dotenv-vault local build)
DOTENV_KEY_DEVELOPMENT="dotenv://:key_fc5c0d276e032a1e5ff295f59d7b63db75b0ae1a5a82ad411f4887c23dc78bd1@dotenv.local/vault/.env.vault?environment=development"
DOTENV_KEY_CI="dotenv://:key_c6bc0b1269b53ee852b269c4ea6d82d82619081f2faddb1e05894fbe90c1ef46@dotenv.local/vault/.env.vault?environment=ci"
DOTENV_KEY_STAGING="dotenv://:key_09ec9bfe7a4512b71b3b1ab12aa2f843f47b8c9dc7d0d954e206f37ca125da69@dotenv.local/vault/.env.vault?environment=staging"
```

🚀 Deploying

```
"scripts": {
    "start": "react-scripts start",
    "start:dev": "env-cmd -f .env.development react-scripts start",
    "start:staging": "env-cmd -f .env.staging react-scripts start",
    "start:prod": "env-cmd -f .env.production react-scripts start",
    "build": "dotenv-vault-decrypt && react-scripts build",         <---ADD Script---
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

```

Go to your web server or cloud platform and set the environment variable `DOTENV_KEY` with the production value. For example, in heroku I'd run the following command.

```
heroku config:set DOTENV_KEY=dotenv://:key_bfa00115ecacb678ba44376526b2f0b3131aa0060f18de357a63eda08af6a7fe@dotenv.local/vault/.env.vault?environment=production
```

Then deploy your code. On boot, the `dotenv` library (>= 16.1.0) will see that a `DOTENV_KEY` is set and use its value to decrypt the production contents of the `.env.vault` file and inject them into your process.

No more scattered secrets across multiple platforms and tools.

<br>
<hr>
<br>

## 🏗️ Usage ( Test in local environment )

After generating files `.env.keys` & `.env.vault` file, create a `.env` file in the root of your project and add one of your environments key (i.e. DOTENV_KEY_STAGING) in `.env`.

\*hint (make sure to rename the key to DOTENV_KEY)

.env file should look like this:

```
DOTENV_KEY="dotenv://:key_1bc2a65a28c76273f8755h545ho548f551c5ac0aca70fba37c9@dotenv.local/vault/.env.vault?environment=staging"
```

then run script `npm run build`, you can also generate environment variables in `.env` file using other script.

after the script runs, `.env` file should be filled with environment variables of the specified environment.
