# Awesome Project Build with TypeORM

Steps to run this project:
0. Download this repository
1. Run `npm i` command
2. create .env file and put your local environment variables there
3. run docker-compose.yml file ```docker compose up -d```
4. run project with: ```npm run start:dev```

# If you want to add new migrations in this project try this.
1. If you create a new entity then create a migration with: ```npx typeorm-ts-node-commonjs migration:generate ./src/config/migration/name_table_created_or_updated -d ./src/config/data-source.ts```
2. Run all migrations created with: ```npx typeorm-ts-node-commonjs migration:run -d ./src/config/data-source.ts```
