function paginationMiddleware(req,res,next){
let page = parseFloat(req.query.page)
let pageSize = parseFloat(req.query.pageSize)

page = (page - 1) * pageSize;

req.query.page = page
req.query.pageSize = pageSize

next()
}

module.exports = paginationMiddleware