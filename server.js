// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

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

fastify.get('/heroes', function(){
    return avengers
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