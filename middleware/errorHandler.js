const { CustomeError} = require('../errors/customeError')

const handleError = (err, req, res, next)=> {
    if(err instanceof CustomeError) {
        return res.status(err.status).json({'msg': err.message});
    }
    res.status(500).json({'msg': err.message});
}

module.exports = {
    handleError
}