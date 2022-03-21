# My Contacts API

API responsible for the registration contacts and your respective contacts. Made in course JStack.

## Running Locally

First of all, clone the project:

```bash
git clone git@github.com:anniasebold/mycontacts-api.git
```

Go to the project directory:

```bash
cd mycontacts-api
```

Install the project dependencies:

```bash
yarn install
```

Run the project

```bash
yarn dev
```
This project will be running at `http://localhost:3000`.

## Configuring Database

**Attention**: You will need Docker installed or PostgreSQL to connect to database.

First of all install the image of PostgreSQL in Docker

```bash
docker pull postgres
```
After this, you will need to configure the connection with PostgreSQL

```bash
docker run --name {name-container} -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```
Start the container

```bash
docker start {name-container}
```
Verify if the container is running

```bash
docker container ls
```
If you wanna connect to database in docker

```bash
docker exec -it {name-container} bash
```
After all this you be able to use the API connected to database.
