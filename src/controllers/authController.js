const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'root' });
const { register, login } = require('../services/authService');


async function registerHandler(req, res) {
    try {
        const response = await register(req.body);

        return res.status(response.code).json({ message: response.message });
    } catch (err) {
        logger.error(err);
    }
};

async function loginHandler(req, res) {
    try {
        const response = await login(req.body);

        if (response.message)
            return res.status(response.code).json({ message: response.message });

        return res.status(200).json(response);
    } catch (err) {
        logger.error(err);
    }
}

async function logoutHandler(req, res) {

}

module.exports = {
    registerHandler,
    loginHandler
};
