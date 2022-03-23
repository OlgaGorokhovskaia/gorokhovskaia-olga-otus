
*** Parrots shop ***

1) input to terminal "npm start"

2) use http://127.0.0.1:4000/ for https://www.graphqlbin.com or https://studio.apollographql.com

3) create query/mutation 

### Example query to get a list of parrots: 
```
query AllParrots {
  allParrots {
    id
    name
    age
    price
    status
    specie {
      name
      description
    }
  }
}
```

### Example query to get the parrot by ID: 
```
query Parrot($parrotId: ID!) {
  parrot(parrotId: $parrotId) {
    id
    name
    age
    status
    price
    specie {
      name
      description
    }
  }
}
```
Variables:
```
{
  "parrotId": "1e202cb5-c374-4146-9605-704a78490ca8"
}
```

### Example mutation to add a new parrot: 
```
mutation AddNewParrot($newParrot: NewParrot!) {
  addNewParrot(newParrot: $newParrot) {
    success
    message
    parrots {
      id
      name
      age
      price
      status
      specie {
        name
        description
      }
    }
  }
}
```
Variables:
```
{
  "newParrot": {
    "name": "Rick",
    "age": 1,
    "price": 50,
    "status": "Reserved",
    "specie": {
        "name": "Budgerigar",
        "description": "Budgies vary in size from 5 to 11 inches. Budgies can live for 10-15 years."
    }
  }
}
```

### Example mutation to change the parrot by ID: 
```
 mutation UpdateParrot($args: ParrotUpdateArgs!) {
  updateParrot(args: $args) {
    success
    message
    parrots {
      id
      name
      age
      price
      status
      specie {
        name
        description
      }
    }
  }
}
```
Variables:
```
{
  "args": {
    "parrotId": "1e202cb5-c374-4146-9605-704a78490ca8",
    "newData": {
      "name": "Rick",
      "age": 1,
      "price": 50,
      "status": "Reserved",
      "specie": {
        "name": "Budgerigar",
        "description": "Budgies vary in size from 5 to 11 inches. Budgies can live for 10-15 years."
      }
    }
  }
}
```
### Example mutation to delete the parrot by ID: 
```
mutation DeleteParrot($parrotId: ID!) {
  deleteParrot(parrotId: $parrotId) {
    success
    message
    parrots {
      id
      name
      age
      price
      status
      specie {
        name
        description
      }
    }
  }
}
```
Variables:
```
{
  "parrotId": "1e202cb5-c374-4146-9605-704a78490ca8"
}
```