const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'root' });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");
const Organization = require('../models/organizationModel');
const { TEACHER, ADMIN } = require('../config/roles');

async function register(body) {
    try {
        const { name, email, password, role, organizationName, inviteCode } = body;
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

module.exports = {
    register
}