## Description

Redvike code chalenge. Task Description: build a basic, robust multi-currency ledger service, that can handle 1k transactions a minute. The ledger service should have the ability to create ledgers, create transactions (debit/credit), record the balance and return the balance.

## Tech stack
- Typescript
- Nest.js
- Bull queue
- Redis
- Postgres
- Open API (Swagger)
- Docker (docker-compose)

## Installation

#### Double check .env file. It should have everything like .env.example


```bash
$ npm install

$ docker-compose up

$ npm run migration:run

```


## Running the app

```bash
# development
$ npm run ledger-start
```

## Test

- Go to `GET http://localhost:3000/open-api`
- Add Currencies on `POST http://localhost:3000/api/v1/currency`
- Add Ledgers on `POST http://localhost:3000/api/v1/ledger`
- Use `POST http://localhost:3000/api/v1/transaction/generate?items=3` to generate transactions and put them to next step request body
- Use `POST http://localhost:3000/api/v1/transaction`to process transactions
- All requests have headers with start/stop timestamps and execution duration in ms
```
 x-time-execute: 7 
 x-timestamp-entry: 1714491026603 
 x-timestamp-exit: 1714491026610 
 ```


## Stay in touch

- Author - [Nick-NodeJS](https://www.linkedin.com/in/mykola-borodyn)

## License

Nest is [MIT licensed](LICENSE).
