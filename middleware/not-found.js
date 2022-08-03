// not found middleware and send 404 error to client 

module.exports = notFound = (req, res) => res.status(404).json('Route does not exist !');





