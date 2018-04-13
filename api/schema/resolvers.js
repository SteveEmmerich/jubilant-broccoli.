const {makeExecutableSchema} = require('graphql-tools') 
const {ObjectId} = require('mongodb')
const prepare = (o) => {
  if (o && o._id) {
      o._id = o._id.toString()
  }
  return o
}
module.exports = (db) => 
{
  const Users = db.collection('users')
  const Searches = db.collection('searches')
  const  typeDefs = [`
    type Query {
      me: User
      user(_id: ID!): User
      users(query: String): [User]
      searches: [Search]
      history: [Search]

    }
    type User {
      _id: ID!
      github: String
      profileImg: String
      username: String
      email: String
      history: [Search]!
      favorites: [Search]!
    }
    type Search {
      _id: ID!
      userId: ID!
      query: String
      favorite: Boolean
    }
    type Mutation {
      createSearch(query: String, favorite: Boolean): Search
      updateSearch(_id: ID!, favorite: Boolean): Search
    }
    schema {
      query: Query
      mutation: Mutation
    }
  `]
  const resolvers = {
    Query: {
      me: async(root, args, {userId}) => {
        if(!userId) {
          return null
        }
        return {
          _id: userId
        }
      },
      user: async (root, {_id}) => {
        return prepare(await Users.findOne(ObjectId(_id)))
      },
      users: async (root, {query}, {userId}) => {
        console.log('users called')
        if (!userId) {
          throw new Error('User not logged in.')
        }
        console.log('args: ', query)
      
        return (await Users.find({query}, {sort: {createdAt: -1}}).toArray()).map(prepare)
      },
      searches: async (root, args, {userId}, context) => {
        if (!userId) {
          throw new Error('User not logged in.')
        }
        return (await Searches.find({}, {sort: {createdAt: -1}}).toArray()).map(prepare)
      },
      history: async(root, args, {userId}) => {
        if (!userId) {
          throw new Error('User not logged in.')
        }
        console.log('getting history: ', args, userId)
        let result = (await Searches.find({}, {sort: {createdAt: 1}}).toArray()).map(prepare)
        //console.log(`History result ${JSON.stringify(result)}`)
        return result
      },
    },
    User: {
      history: async({_id}) => {
        return (await Searches.find({userId: _id}, {sort: {createdAt: 1}}).toArray()).map(prepare)
      },
      favorites: async({_id}) => {
        return (await Searches.find({userId: _id, favorite: true}, {sort: {createdAt: 1}}).toArray()).map(prepare)
      }
    },
    Mutation: {
      createSearch: async (root, args, {userId, favorite}, info) => {
        if(!userId) {
          throw new Error(`User not logged in`);
        }
        console.log('Creating search', args)
        args.userId = userId;
        args.favorite = favorite || false;
        args.createdAt = new Date()
        //let results = (await Users.find({}))
        //args.success =
        const _id = (await Searches.insertOne(args)).insertedId
        return prepare(await Searches.findOne(ObjectId(_id)))
      },
    updateSearch: async (root, args, {userId}) => {
      console.log('args: ', args)
      let update = prepare(await Searches.findAndModify(
        {_id: ObjectId(args._id)}, 
        [['_id', 'asc']],
        {$set: {favorite: args.favorite}}
        )).value
      console.log('update: ', update)
      return update
    }
    }
  }

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  })
  return schema;
}