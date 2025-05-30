const express = require('express');
const Router = express.Router();
const cendidents = require('../models/condidentModel');
const users = require('../models/userModel');
const jwtverify = require('../utils/jwtvarify');

/**
 * @swagger
 * /vote/candidates:
 *   get:
 *     summary: Get all candidates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all candidates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   partyname:
 *                     type: string
 *                   age:
 *                     type: number
 *                   votes:
 *                     type: string
 *                   votecount:
 *                     type: number
 *       500:
 *         description: Internal server error
 */
    
Router.get("/candidates", jwtverify, async (req, res) => {
    try {
        const candidates = await cendidents.find();
        res.status(200).json(candidates);
    } catch (error) {
        console.error('Internal server error');
        res.status(500).json({ error: 'Internal server error' });
    }
});


/**
 * @swagger
 * /vote/{candidateid}:
 *   post:
 *     summary: Vote for a candidate
 *     description: Allows a user to vote for a candidate by ID. Requires JWT authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the candidate to vote for
 *     responses:
 *       200:
 *         description: Vote recorded successfully
 *       400:
 *         description: User has already voted or candidate not found
 *       500:
 *         description: Internal server error
 */

Router.post("/:candidateid",jwtverify,async (req,res) => {

   
    try {
        const man = await users.findOne({_id : req.user.id});

        if(man.isvoted == false){

            const condident = await cendidents.findOne({_id : req.params.candidateid});
            if(condident){
                condident.votes.push(req.user.id);
                condident.votecount += 1;
                await condident.save();
                man.isvoted = true;
                await man.save();
                res.send('Vote recorded successfully.');
            }
            else{
                console.log('not found');
            }
        }
        else{
            res.send('you can voted');
        }
        
    } catch (error) {
        res.status(500).send('condidate not found');
        
    }
})

module.exports = Router;