# Budget App

An app to keep track of your money.

## Backend Setup

* Install dependencies `npm install`
* Create a `.env` with your values
* Run the postgres db / adminer: Run `docker-compose up`
* Migrate the database: `npm run mgrate`

* Adminer will be running at http://localhost:8080


# Model a SQL Database

Entity - The description of some thing in you database
    Record - is a single instance of an entity

Every Record will have:
    Created At - datetime
    Updated At - datetime
    Deleted At - datetime

## Entities in a Budget system

* [x] User
* [x] Project
* [x] Project_type (Business, private, inventory)
* [x] Report
* [x] ItemGroup
* [x] Item
* [x] Item_type (Asset(depense), Revenu(liability))
* [x] Project_report
* [x] state
* [x] country
* [x] currency
* [x] location





