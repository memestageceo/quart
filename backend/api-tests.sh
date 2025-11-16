#!/bin/bash

# contains test scripts for api tests based on file - ./src/index.ts

WEBSITE=http://localhost:3000

# post todo which takes data {title: string, completed: boolean, description: string}

curl -X POST $WEBSITE/todos -H "Content-Type: application/json" -d '{"title": "Test Todo", "completed": false, "description": "This is a test todo"}'

# get all todos from /todos.

curl -X GET $WEBSITE/todos
