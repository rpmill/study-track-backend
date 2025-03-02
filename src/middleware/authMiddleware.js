const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'authMiddleware' });
const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacherModel');
const { TEACHER, ADMIN } = require ('../config/roles');

async function protect(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token)
            return res.status(401).json({ message: 'Not authorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Teacher.findById(decoded.id).select('-password');

        next();
    } catch (err) {
        logger.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
};

function isAdmin (req, res, next) {
    try {
        if (!req.user || req.user.role !== ADMIN)
            return res.status(403).json({ message: 'Access denied' });

        next();
    } catch (err) {
        logger.error(err);
        res.status(403).json({ message: 'An error occurred validating access. Please try again later.' });
    }
};

module.exports = {
    protect,
    isAdmin
}