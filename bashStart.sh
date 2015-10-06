#!/bin/bash
while read line; do export "$line";
done < .env

nodemon server/server.js
