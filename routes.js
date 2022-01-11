// Express routing

const express = require('express');

const {getUsers, getUser, postUser, putUser, deleteUser} = require('./cruds.js');

const router = express.Router();

router.get('/users', async function(req, res) {
  await getUsers( req, res )
});

router.get('/users/:userID', async function(req, res) {
  await getUser( req, res )
});

router.post('/users', async function(req, res) {
  await postUser( req, res )
});

router.put('/users/:id', async function(req, res) {
  await putUser( req, res )
});

router.delete('/users/:id', async function(req, res) {
  await deleteUser( req, res )
});

module.exports = router;
