// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const { ObjectId } = require('mongodb')

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

fastify.get('/heroes', async() => {
    const collection = fastify.mongo.db.collection("heroes")
    const result = await collection.find({}).toArray()
    return result
})

// /heroes/69 GET -obtiens le héros avec l'ID 69
// /heroes/heroesId ... findOne()

fastify.get('/heroes/:heroesId', async(request, reply) => {

    // Documentation : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    // const heroesId = request.params.heroesId
    const { heroesId } = request.params
    const collection = fastify.mongo.db.collection("heroes")
    const result = await collection.findOne({
        _id: new ObjectId(heroesId)
    })
    return result 
})

// /heroes POST - creer un nouvel héros

fastify.post('/heroes', async(request, reply) => {
    const collection = fastify.mongo.db.collection("heroes")
    const result = await collection.insertOne(request.body)
    return result.ops[0].name
    //.ops permet de renvoyer un tableau sans les infos du serveur
    // le .name permet d'avoir uniquement le nom de l'indice 0 du tableau
})

fastify.get('/me', function(){
    return{
        prénom: "Emerick",
        nom: "SAMSON",
        job: "ingé son",
    }
})

// /heroes/bio/id
// Cette route devra retourné: nomDuHero connu sous le nom de vraiNom. Je suis née à lieuDeNaissance. J'ai XX en intelligence, et YY en vitesse.


fastify.get('/heroes/bio/:heroesId', async (request, reply) => {
	const collection = fastify.mongo.db.collection('heroes')
	const { heroesId } = request.params
	const result = await collection.findOne({
		_id: new ObjectId(heroesId)
	})

    const { name, biography, powerstats: {intelligence, speed} } = result
    // const { speed, intelligence } = powerstats
	// Template literals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	return `${name} connu sous le nom de ${biography["full-name"]}. Je suis née à ${biography["place-of-birth"]}. J'ai ${intelligence} en intelligence, et ${speed} en vitesse.`
})

fastify.delete('/heroes/:heroesId', async (request, reply) => {
    const collection = fastify.mongo.db.collection('heroes')
    const {heroesId} = request.params
    const result = await collection.findOneAndDelete({
        _id: new ObjectId(heroesId)
    })
    return result
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