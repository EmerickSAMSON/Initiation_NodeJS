// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Connection à la BDD

fastify.register(require('fastify-mongodb'), {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  
  url: 'mongodb://localhost:27017/superheroes'
})

//METHOD API REST
// GET - READ
// POST - CREATE
// PATCH / PUT - UPDATE
// DELETE - DELETE

// Declare a route
fastify.get('/', (request, reply) => {
    // Ici on retourne un objet javascrit qui va etre converti en JSON (JavaScript Object Notation)
    return { hello: 'world' }
})

// Déclarer la route /heroes - Cette route retournera la liste des avengers
const avengers = ["Iron Man", "Captain America", "Spiderman"]

// /heroes GET - obtiens la liste des héros

fastify.get('/heroes', () => {
    return avengers
})

// /heroes POST - creer un nouvel héros

fastify.post('/heroes', (request, reply) => {
    const collection = fastify.mongo.db.collection("heroes")
    collection.insertOne(request.body)
    return null
})

fastify.get('/me', function(){
    return{
        prénom: "Emerick",
        nom: "SAMSON",
        job: "ingé son",
    }
})

// Run the server!
const start = async () => {
    try {
    await fastify.listen(3000)
    } catch (err) {
    fastify.log.error(err)
    process.exit(1)
    }
}
start()