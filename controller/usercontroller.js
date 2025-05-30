const users = require('../models/userModel');
const bcrypt = require('bcrypt');
const tokengenreate = require('../utils/jwttoken');



const usersingupcreateheandler = () => {
    return async (req,res) => {
        try{
            const {name,age,email,phone,adharnumber,password} = req.body;
            let user = await users.findOne({email});
            if(user) return res.status(500).send('increate email or password');
    
            if(age > 18){

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, async (err, hash) => {
                        let user = await users.create({
                            name,
                            age,
                            email,
                            phone,
                            adharnumber,
                            password : hash
                        });
                        let token = tokengenreate(user._id);
                        res.cookie("token",token);
                        res.status(200).send("singup successfully");
                    }); 
                });
            }
            else{
                res.send('you are not voted');
            }
        }
        catch
        {
            res.status(500).send({msg : 'internal server error'});
        }
        
    }
}

const userloginheandler = () => {
    return async function(req,res){
        let {email,password} = req.body;
        
        let user = await users.findOne({email});
        
        if(!user) return res.status(500).send("somethin went wrong");
        
        bcrypt.compare(password, user.password, function(err, result){
            if(result){
                let token = tokengenreate(user._id)
                res.cookie("token",token);
                res.status(200).send('successfully login...');
            }
            else{
                res.status(500).send("somethin went wrong");
    
            }
        })
        
         
    }
}




module.exports = {
    usersingupcreateheandler,
    userloginheandler,
}