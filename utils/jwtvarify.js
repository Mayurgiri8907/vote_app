const jwt = require('jsonwebtoken');

const jwtverify = (req, res, next) => {
    if(req.cookies.token == ""){
        res.send('please login');
    }
    else{
        let data = jwt.verify(req.cookies.token,"shhhh");
        req.user = data;
        next();
    }
};

module.exports = jwtverify;