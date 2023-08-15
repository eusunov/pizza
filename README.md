<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This REST interface is a working prototype of API for pizza ordering (written using NetsJS with TS).

The interface uses the JWT Bearer token in the authorization header for authentication.

The APIs use user roles (i.e., customer, maker, admin) to implement the authorization strategy.

It mocks the persistency layer in the in-memory data structure.

The implementation is for presentation/testing purposes.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Usage

To demonstrate the usage, we show the following examples of CURL requests:

Start the application:

```bash
# start
$ npm run start
```
### Check the pizzeria offering (the products)

We look at the offering with the following:

```bash
# GET products
curl -X GET -H 'Content-Type: application/json' http://localhost:3000/products
```

The result is:

```json
[
  {
    "id":"7733f582-2a64-4040-9e04-bd3f6e28af3",
    "name":"Margarita",
     "category":"Pizza",
     "ingredients":"cheese, tomapto, oregano",
     "weightGramm":330,
     "priseBGN":12.99,
     "created":"2023-08-15T14:47:14.859Z",
     "updated":"2023-08-15T14:47:14.859Z",
     "active":true
   },
   {
     "id":"ca8ac377-be4f-4ceb-9496-7e7e0c982481",
      "name":"Staropramen",
      "category":"beer",
      "ingredients":"hops, water",
      "volumeLiter":0.33,
      "priseBGN":3.5,
      "created":"2023-08-15T14:47:14.859Z",
      "updated":"2023-08-15T14:47:14.859Z",
      "active":true
   }
]
```

### Register/create new customer

To order first, we need to register.

The *register.json* is the payload required for the registration:

```json
{
  "email": "dragan@draganov.com",
  "name": "Customer",
  "phone": "+359888777777",
  "password": "11223344",
  "active": true
}
```
The registration request:
```bash
# POST auth/register
curl -X POST -H 'Content-Type: application/json' http://localhost:3000/auth/register -d @register.json
```
### Sign-in users:

The *login.json* is the payload required for the login:
```json
{
  "email": "dragan@draganov.com",
  "password": "11223344",
}
```
The login request:

```bash
# POST auth/login
curl -X POST -H 'Content-Type: application/json' http://localhost:3000/auth/login -d @register.json
{"access_token":"eyJhbGciOiJIUzI1..."}
```
We get back the access token to use for the subsequent request.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
