const debug = require('debug')('app:user');
const User = require('../models/User');

/**
   * GET /users
   * Return all users in the DB
   */
exports.listUsers = async (req, res) => {
    return User.find()
}

/**
   * GET /users/:email
   * Return a User with specified email
   */
exports.readUser = async (req, res) => {
    const [user] = await User.find({ email: req.params.userEmail })
    if (!user) throw new Error('User not found')
    return user
}


/**
   * POST /users
   * Create User
   */
exports.addUser = async (req, res) => {
    const data = req.body
    const newUser = new User(data)
    const userSaved = await newUser.save()
    return userSaved
}

/**
   * PUT /users:email
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
 * DELETE /users:id
 * Delete an user
 */
exports.deleteUser = async (req) => {
    const user = await User.findOne({ email: req.params.userEmail })
    if (!user) throw new NotFound()
    await user.remove()
    return { done: true, message: 'Deleted correctly' }
}