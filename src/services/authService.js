const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'root' });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/teacherModel");
const Organization = require('../models/organizationModel');
const { TEACHER, ADMIN } = require('../config/roles');

async function generateToken(id, role) {
    try {
        return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    } catch (err) {
        logger.error(err);
        throw(err);
    }
};

async function register(body) {
    try {
        const { name, email, password, organizationName, inviteCode } = body;
        let response = { code: null, message: null };

        let organization = null;

        // if invite code is provided, bind the user to an existing organization
        if (inviteCode) {
            organization = await Organization.findOne({ inviteCode });

            if (!organization) {
                response.code = 400;
                response.message = 'Invalid invitation code';
                return response;
            }     
        }

        // otherwise, create new organization and make the user the admin
        else if (organizationName) {
            organization = await Organization.create({ name: organizationName });
        } else {
            response.code = 400;
            response.message = 'Must provide organization name or invite code';
            return response;
        }

        console.log(inviteCode ? TEACHER : ADMIN);

        const user = await Teacher.create({
            name,
            email,
            password,
            role: inviteCode ? TEACHER : ADMIN,
            organization: organization._id
        });

        response.code = 201;
        response.message = 'User registered'

        logger.debug(`User registered successfully - UserID: ${user._id}`);

        return response;

    } catch (err) {
        logger.error(err);
        throw (err);
    }
};

async function login(body) {
    try {
        const { email, password } = body;
        const user = await Teacher.findOne({ email });
        let response = { code: null, message: null };

        if (!user || !(await user.matchPassword(password))) {
            response.code = 401;
            response.message = 'Invalid credentials';
            return response;
        }

        const token = await generateToken(user._id, user.role);

        return { token: token, user: { id: user._id, name: user.name, role: user.role } };
    } catch(err) {
        logger.error(err);
        response.code = 500;
        response.message = err.message;
        return response;
    }
}

module.exports = {
    register,
    login
}