
const notFoundPath = (req, res)=> {
    res.status(404).send('<h1>Not Found 404</h1>');
}

module.exports = {
    notFoundPath
}