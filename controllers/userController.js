const debug = require('debug')('app:user');
const { InvalidCredentials, Unauthorized } = require('../lib/exceptionPool');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const {
    createUserFromProfile,
    getTraditionalUser,
    createTraditionalUser,
} = require('../services/userServices');

/**
   * POST /user/login
   * Check that the user exist, and if so return the JWT bearer
   */
exports.login = async (req, res) => {
    const { payload, provider } = req.body;

    // Get user
    const user = await getUserFromCredentials(provider, payload);

    // JWT creation
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
    });

    // Return session bearer
    return { bearer: token };
}

/**
   * POST /user/register
   * Check that the user doesn't exist, and if so create an user in DB with the user data
   */
exports.register = async (req, res) => {
    const { email, name, password } = req.body;
    await createTraditionalUser({ email, name, password });
    return { done: true, message: `Message sent to ${email}` };
}

// For future I put methods to protect the routes
// It loads the user in the request.
exports.loadUser = async (req, res, next) => {
    const [, bearer] = (req.headers.authorization || '').split(' ');

    if (bearer) {
        const userJWT = jwt.verify(bearer, process.env.JWT_SECRET);
        const user = await User.findById(userJWT._id);
        req.user = user;
    }
    next();
}
// Take the user from the request and returns Unauthorized if not exist.
exports.requireUser = async (req, res, next) => {
    if (!req.user) throw new Unauthorized();
    next();
}
// In case there is an user returns Unauthorized error
exports.requireNoUser = (req, res, next) => {
    if (req.user) throw new Unauthorized('User should not be logged');
    next();
}
// Get the user from the request
exports.getUser = (req, res) => {
    return req.user.toPublic();
}

/**
   * GET /user
   * Return all users in the DB
   */
exports.listUsers = async (req, res) => {
    return User.find()
}

/**
   * GET /user/:email
   * Return a User with specified email
   */
exports.readUser = async (req, res) => {
    const [user] = await User.find({ email: req.params.userEmail })
    if (!user) throw new Error('User not found')
    return user
}

/**
   * PUT /user/:email
   * Update an user by email
   */
exports.updateUser = async (req) => {
    const email = req.params.userEmail
    const data = req.body

    const userSaved = await User.findOneAndUpdate({ email }, data, {
        new: true,
    })

    if (!userSaved) throw new NotFound()
    return userSaved
}

/**
 * DELETE /user/:id
 * Delete an user
 */
exports.deleteUser = async (req) => {
    const user = await User.findOne({ email: req.params.userEmail })
    if (!user) throw new NotFound()
    await user.remove()
    return { done: true, message: 'Deleted correctly' }
}

/**
 * Given provider data, returns an user from db,
 * if not found and coming from social it creates a new one
 * @param {String} provider github|traditional
 * @param {Object} payload Provider needed info to login
 */
async function getUserFromCredentials(provider, payload) {
    if (!['github', 'traditional'].includes(provider)) {
        throw new InvalidCredentials('Invalid provider');
    }
    if (!payload || typeof payload !== 'object') {
        throw new InvalidCredentials('Invalid payload');
    }

    // Traditional
    if (provider === 'traditional') {
        return getTraditionalUser(payload);
    }

    // Social
    let profile;
    try {
        // Get profile from provider
        if (provider === 'github') {
            profile = await providerService.getProfileFromGithub(payload);
        }
    } catch (err) {
        throw new InvalidCredentials(err.message);
    }
    debug('login', provider, profile);
    return createUserFromProfile(provider, profile);
}