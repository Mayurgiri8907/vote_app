const express = require('express');
const Router = express.Router();
const cendidents = require('../models/condidentModel');
const userModel = require('../models/userModel');
const jwtverify = require('../utils/jwtvarify');

/**
 * @swagger
 * /candidates/:
 *   post:
 *     summary: Create a new candidate (admin only)
 *     description: Allows an admin user to create a new election candidate.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - partyname
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               partyname:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Candidate created successfully
 *       400:
 *         description: Not authorized or invalid input
 *       500:
 *         description: Candidate already exists or server error
 */

Router.post('/',jwtverify,async (req,res) => {
    try {
        const user = await userModel.findOne({_id : req.user.id});

        
        if(user.role == 'admin'){

            const {name,partyname,age} = req.body;
    
            const candidate = await cendidents.findOne({partyname});
    
            if(candidate) return res.status(500).send('candidates already exgist');
    
            let condident = await cendidents.create({
                name,
                partyname,
                age
            })
    
            res.status(200).send('candidates created successfully');
        }
        else{
            res.send('only admin can create condidents');
        }
    } catch (error) {
        console.log('internal error');
    }
})

module.exports = Router;