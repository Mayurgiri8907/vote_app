const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const tokengenreate = (id) =>{
    return jwt.sign({id}, process.env.SECRET_KEY);
}


module.exports = tokengenreate;