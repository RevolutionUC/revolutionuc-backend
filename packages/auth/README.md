# Auth Service

Auth Microservice for the RevolutionUC Hackathon System

## Description

This microservice handles user creation, authentication, and authorization. It implements Clean Architecture and CQRS pattern.

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

## Test

```bash
# unit tests
$ npm run test

```

## Domain

The Auth system implements role and scope based access and password based authentication. Consumers of the auth service can create users and assign them a role and scope. Roles can be recognized system-wide and used to dictate the user's capabilities, and scope is the identifier of the consumer-specific resource that the user has access to, which is usually their own implementation of the user.

The service implements bcrypt to hash passwords, and JWTs to generate and validate authentication tokens. Login tokens can be provided to the user directly since they are password-authenticated, however, password reset tokens are not, so they should be provided to the user only through a secure medium (like email or text).

## Stay in touch

- Author - [Dev Agrawal](https://devagr.me)
