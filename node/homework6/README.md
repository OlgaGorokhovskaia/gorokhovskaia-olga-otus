
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
  parrot(id: $parrotId) {
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
Variables:
```
{
  "parrotId": "168a4d71-eab3-4246-900f-5ff5702d5771"
}
```

### Example mutation to add a new parrot: 
```
mutation AddNewParrot($newParrot: ParrotNewData!) {
  addNewParrot(newParrot: $newParrot) {
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
Variables:
```
{
  "args": {
    "id": "15ecb74c-e0d8-461b-ada8-cea3a443f88a",
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
```
### Example mutation to delete the parrot by ID: 
```
mutation DeleteParrot($deleteParrotId: ID!) {
  deleteParrot(id: $deleteParrotId) {
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
Variables:
```
{
    "deleteParrotId": "15ecb74c-e0d8-461b-ada8-cea3a443f88a",
}
```