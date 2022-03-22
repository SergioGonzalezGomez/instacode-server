const jwt = require('jsonwebtoken');

const validationPassword = (password) => {
    const response = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/;
    return response.test(String(password));
};

const setError = (code, message) => {
    const error = new Error();
    error.code = code;
    error.message = message;
    return error;
}

const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    validationPassword,
    setError,
    generateToken,
    verifyToken
}