const express = require('express');
const Router = express.Router()
const {usersingupcreateheandler,userloginheandler} = require('../controller/usercontroller');


/**
 * @swagger
 * /user/singup:
 *   post:
 *     summary: User signup
 *     description: Creates a new user if age is over 18, stores hashed password, and sets a JWT cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - email
 *               - phone
 *               - adharnumber
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               adharnumber:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signup successful, token set in cookie
 *       400:
 *         description: User under age or invalid input
 *       500:
 *         description: Email already exists or internal server error
 */

Router.post('/singup',usersingupcreateheandler());


/**
 * @swagger
 * /user/singin:
 *   post:
 *     summary: User login
 *     description: Logs a user in with email and password, returns a cookie with a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in, JWT token sent as cookie.
 *       500:
 *         description: Something went wrong (e.g., invalid credentials).
 */

Router.post('/singin',userloginheandler());

Router.get("/logout",function(req,res){
    res.cookie("token", "");
    res.status(200).send('logout successfully...');
})

module.exports = Router;