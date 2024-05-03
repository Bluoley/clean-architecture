# Melp Backend

Melp is a project about restaurant managment.

Clean Architecture in Node.js

## Installation
Must have docker previously installed

    docker build -t bluoley/melp .
    docker container run -d -p 3000:3000 bluoley/melp

or if you have Node.js v20, just

    npm install
    npx ts-node index.ts

## Database
    Using PostgreSQL 16 hosted on AWS RDS

## Demo
- [API URL](https://melp-back-350637d82aa7.herokuapp.com/)
- [Postman Collection](https://www.postman.com/bluoley/workspace/test/collection/29465272-68b26983-6e1e-456e-b88d-ce50549f66d2?action=share&creator=29465272)

# Documentation

## Statistics

    GET - /restaurant/statistics?latitude=19.442246&longitude=-99.128660&radius=200

    Response {
        "avg": "1.00000000000000000000",
        "count": "7",
        "std": "1.00000000000000000000"
    }

## Create
    POST - /restaurant
    
    Body {
        csvFile: File
    }

    Response {
        [
            {
            "id": "851f799f-0852-439e-b9b2-df92c43e7672",
            "rating": "1",
            "name": "Barajas, Bahena and Kano",
            "site": "https://federico.com",
            "email": "Anita_Mata71@hotmail.com",
            "phone": "534 814 204",
            "street": "82247 Mariano Entrada",
            "city": "Mérida Alfredotown",
            "state": "Durango",
            "lat": "19.4400570537131",
            "lng": "-99.1270470974249"
            },
            {
            "id": "4e17896d-a26f-44ae-a8a4-5fbd5cde79b0",
            "rating": "0",
            "name": "Hernández - Lira",
            "site": "http://graciela.com.mx",
            "email": "Brandon_Vigil@hotmail.com",
            "phone": "570 746 998",
            "street": "93725 Erick Arroyo",
            "city": "Mateofurt",
            "state": "Hidalgo",
            "lat": "19.437904276995",
            "lng": "-99.1286576775023"
            },
            ...
        ]
    }

## GetAll
    GET - /restaurant?limit=10&offset=0

    Response {
        [
            {
            "id": "851f799f-0852-439e-b9b2-df92c43e7672",
            "rating": "1",
            "name": "Barajas, Bahena and Kano",
            "site": "https://federico.com",
            "email": "Anita_Mata71@hotmail.com",
            "phone": "534 814 204",
            "street": "82247 Mariano Entrada",
            "city": "Mérida Alfredotown",
            "state": "Durango",
            "lat": "19.4400570537131",
            "lng": "-99.1270470974249"
            },
            {
            "id": "4e17896d-a26f-44ae-a8a4-5fbd5cde79b0",
            "rating": "0",
            "name": "Hernández - Lira",
            "site": "http://graciela.com.mx",
            "email": "Brandon_Vigil@hotmail.com",
            "phone": "570 746 998",
            "street": "93725 Erick Arroyo",
            "city": "Mateofurt",
            "state": "Hidalgo",
            "lat": "19.437904276995",
            "lng": "-99.1286576775023"
            },
            ...
        ]
    }

## GetById

    GET - /restaurant/id/c0ffd058-e773-47f1-974b-42d41cb555bf

    Response {
        {
            "id": "c0ffd058-e773-47f1-974b-42d41cb555bf",
            "rating": 3,
            "name": "Rendón - Elizondo",
            "site": "https://cristina.mx",
            "email": "Hugo.Casanova49@gmail.com",
            "phone": "5866-337-812",
            "street": "5518 Monserrat Explanada",
            "city": "Chignahuapan María",
            "state": "Sinaloa",
            "lat": 19.4360705910348,
            "lng": -99.1297865731994
        }       
    }

## Update

    PUT - /restaurant/c0ffd058-e773-47f1-974b-42d41cb555bf

    Body {
        rating: 1
        state: Sonora
        ... X
    }

    Response {
        true
    }

## Delete

    DELETE - /restaurant/c0ffd058-e773-47f1-974b-42d41cb555bf

    Response {
        true
    }
