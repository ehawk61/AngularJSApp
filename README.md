CountryViewer
============
Viewing Countries loaded into a MongoDB and having basic CRUD operations to it. 


## Tools in this repo 
- NestJS for the backend (https://nestjs.com/)
- React for the frontend 

## Background of the project 
This project began life as an Express application and after years of nelgect I wanted to bring up to something a bit more modern. 

## Prerequsites 
- Node v14.7.0 or later
- Yarn v1.22.4 or later 

## Getting Started locally with it 🚀
#### Prereqs 
1. Ensure yarn & node are installed 
2. Run `yarn install`
3. Ensure that a mongoDB is running on `localhost:27017`

#### Backend
1. Run `yarn workspace server start:dev` for development
2. Run `yarn workspace server start:debug` for debugging 
3. Run `yarn workspace server start:prod` for production runs 

#### Frontend 
1. Run `yarn workspace frontend start` for development

#### Running Both 
1. Run `yarn start` fron root directory of repo
