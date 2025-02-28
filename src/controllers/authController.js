const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'root' });
const { register } = require('../services/authService');


async function registerHandler(req, res) {
    try {
        const response = await register(req.body);

        return res.status(response.code).json({ message: response.message });
    } catch (err) {
        logger.error(err);
    }
};

async function loginHandler(req, res) {

}

async function logoutHandler(req, res) {

}

module.exports = {
    register,
    login,
    logout
};
