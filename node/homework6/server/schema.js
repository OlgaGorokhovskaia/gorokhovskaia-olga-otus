const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    allParrots: [Parrot]!
    parrot(parrotId: ID!): Parrot
  }

  type Mutation {
    addNewParrot(newParrot: NewParrot!): ParrotsResponse!
    updateParrot(args: ParrotUpdateArgs!): ParrotsResponse!
    deleteParrot(parrotId: ID!): ParrotsResponse!
  }

  type ParrotsResponse {
    success: Boolean!
    message: String!
    parrots:[Parrot]
  }

  input ParrotUpdateArgs {
    parrotId: ID!
    newData: NewParrot!
  }

  input NewParrot {
    "The parrot's name"
    name: String
    "The parrot's age (years))"
    age: Int
    "The parrot's price ($)"
    price: Float
    status: Status
    specie: SpecieInput
  }

  input SpecieInput {
    "The specie's name"
    name: SpecieName
    "The description of size and life expectancy"
    description: String
  }
    
  type Parrot {
    id: ID!
    name: String!
    "The age (years))"
    age: Int
    "The price ($)"
    price: Float!
    status: Status!
    specie: Specie!
  }

  type Specie {
    "The specie's name"
    name: SpecieName!
    "The description of size and life expectancy"
    description: String
  }

  input SpecieInput {
    "The specie's name"
    name: SpecieName!
    "The description of size and life expectancy"
    description: String!
  }

  enum SpecieName {
    Budgerigar
    Canary 
    Cockatiel
  }

  enum Status {
    Available
    Decommissioned
    Reserved
    Sold
  }
`

module.exports = typeDefs;