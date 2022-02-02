async function jwtMiddleware(req,res,next){
    return res.json({
        data: req.headers,
    });
}

module.exports = jwtMiddleware