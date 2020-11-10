# Ivy
Fill your database quickly with random but structured values.

## Introduction
This application does a simple job. As it receives a API url and schema for your model, it will fill your database for you! It 
is going to make random values everytime with the filter you provide. 

For example, the following below is the REST API url I would send data in order to fill database.

```
URL : localhost:5000/createUser
User Model
{
  "name" : "string",
  "age" : "number"
}
```

To respond to this project, we can simply create a request using Ivy! In the following example, I am going to show you an example filling 10 values with names all lower cased and age between 20 and 25(inclusive).
```
{
  "url" : "localhost:5000/createUser",
  "quantity" : 10,
  "template" : {
    "year" : {
      "type" : "number",
      "min" : 5,
      "max" : 10
    },
    "name" : {
      "type":"string",
      "length": 10,
      "typeCase": "lower"
    }
  }
}
```

With this, you will see your database has been updated with 10 new users!
