//Realisation of CRUD methods

const { randomUUID } = require('crypto');

const { Users } = require('./models');

module.exports = {
    getUsers : async function (request, response){
        console.log('GET /');

        const users = await Users.find();

        return response.send(users);
    },

    getUser : async function ( { params }, response ){
        const userID = params.id;

        console.log(`GET /users/${userID}`);

        const user = await Users.findById(userID);

        if (user === null) {
            return response.status(404).send(`User is not found by ID ${userID}`);
        }

        return response.send(user);
    },

    postUser : async function ( { body }, response ){
        console.log(`POST /users with req ${JSON.stringify(body)}`);

        const { login } = body;

        const existedUser = await Users.findOne({ login });

        if (existedUser !== null) {
            return response.status(400).send('User already exists');
        }

        const newUser = await Users.create({ ...body, _id: randomUUID()})

        return response.status(201).send(newUser);
    },


    putUser : async function ( { params, body }, response ) {
        const { userID } = params;

        console.log(`PUT /users/:id with req { _id : ${userID} }, ${JSON.stringify(body)}`)

        const existedUser = await Users.findOne({ userID  });

        if (!existedUser) {
            return response.status(400).send(`There is no user with id ${ userID }`);
        }

        const newUser = await Users.updateOne(userID, body);

        return response.status(201).send(newUser);
    },

    deleteUser : async function ( {params}, response) {
        const id = params.id;

        console.log(`DELETE /users/:id with req ${JSON.stringify(params)}`)

        const existedUser = await Users.findById(id);

        if (existedUser !== null) {
            return response.status(404).send();
        }

        await Users.findByIdAndDelete(id);

        return response.status(204).send();
    }
}