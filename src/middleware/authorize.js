const { verifyToken, setError } = require('../helpers/utils');
const User = require('../api/users/user.model');

const authorize = async (req, _res, next) => {
    try {
        const token = req.headers.authorization;
        if(!token) throw new Error();
        const tokenNoBearer = token.replace("Bearer ", '');
        const validToken = verifyToken(tokenNoBearer, process.env.JWT_SECRET);
        const user = await User.findById(validToken.id);
        req.user = user;
        next();

    } catch (error) {
        return next(setError(401, 'No autorizado'));
    }
}

module.exports = {
    authorize
};