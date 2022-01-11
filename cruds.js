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
        const { userID } = params;

        console.log(params.id, params._id, params);
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

        const newUser = await Users.create({ ...body, _id: randomUUID()});

        return response.status(201).send(newUser);
    },


    putUser : async function ( { params, body }, response ) {
        const userID = params.id;

        console.log(`PUT /users/:id with req { _id : ${userID} }, ${JSON.stringify(body)}`)

        const existedUserID = await Users.findById(userID);

        if (!existedUserID) {
            return response.status(400).send(`There is no user with id ${ userID }`);
        }

        const { login } = body;

        const existedUserLogin = await Users.findOne({ login });

        if (existedUserLogin !== null) {
            return response.status(400).send('User with the same login already exists');
        }

        await Users.updateOne({_id : userID}, body);

        const newUser = await Users.findById(userID);

        return response.status(201).send(newUser);
    },

    deleteUser : async function ( {params}, response) {
        const userID = params.id;

        console.log(`DELETE /users/:${ userID } with req ${ JSON.stringify(params) }`)

        const existedUser = await Users.findById(userID);

        if (!existedUser) {
            return response.status(400).send(`There is no user with id ${ userID }`);
        }

        await Users.findByIdAndDelete(userID);

        return response.status(204).send();
    }
}