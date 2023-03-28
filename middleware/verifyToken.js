const jwt = require("jsonwebtoken");
const config = process.env;

function verifyToken(req, res, next){

    const token =
    req.body.token || req.query.token || req.headers["x-access-token"];//this x-access-token is a field you have to set in the header of the request

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();

    // const bearerHeader = req.headers['authorization'];
    // console.log("bearerHeaderbearerHeader", bearerHeader)
    // if(typeof bearerHeader !== 'undefined'){
    //     const bearerToken  = bearerHeader.split(' ')[1]
    //     req.token = bearerToken
    //     next()
    // }else{ 
    //     res.sendStatus(403)
    // }
}

module.exports = verifyToken;