# Task Manager

## Link to the website: [Click to view website](https://app-task-manager-app.vercel.app/)

### Create .env file like this in server folder

```shell
cd server
```

```shell
DATABASE_HOST=ep-icy-leaf-a4q6qgvr-pooler.us-east-1.aws.neon.tech
DATABASE_PORT=5432
DATABASE_USERNAME=default
DATABASE_PASSWORD=uJliQh2YoV7O
DATABASE_NAME=verceldb
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=pgadmin4
POSTGRES_PASSWORD=uJliQh2YoV7O
POSTGRES_URL=postgres://default:uJliQh2YoV7O@ep-icy-leaf-a4q6qgvr-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require

```

### Installation

```shell
$ npm install
```

### Running the app

```shell
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

### Run client

```shell
cd client
```

```shell
npm i
npm run  start
```
