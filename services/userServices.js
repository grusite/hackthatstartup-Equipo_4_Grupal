const User = require('../models/User');
const { InvalidCredentials, TooSoon } = require('../lib/exceptionPool');

/**
 * Create or update a user document, using email as glue
 * @param {String} provider Type of provider (google|facebook)
 * @param {Object} profile Properties of user in that provider
 */
async function createUserFromProfile(provider, profile) {
  let user = await User.findOne({ email: profile.email });

  if (!user) {
    user = new User({
      email: profile.email,
      name: profile.name
    });
  }
  user.provider[provider] = profile.data;
  await user.save();
  return user;
}

async function getUserFromEmail(email) {
  return User.findOne({ email });
}

async function getTraditionalUser({ email, password }) {
  return await findUserByEmailPassword(email, password);
}

async function findUserByEmailPassword(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new InvalidCredentials({ reason: 'userNotFound' });
  }

  if (!(await user.comparePassword(password))) {
    throw new InvalidCredentials({ reason: 'invalidPassword' });
  }
  return user;
}
async function createTraditionalUser({ email, name, password }) {
  const foundUser = await getUserFromEmail(email);
  if (foundUser && foundUser.hasProvider('traditional')) {
    throw new InvalidCredentials({
      reason: 'registered',
      verified: foundUser.isVerified()
    });
  }

  await createUserFromProfile('traditional', {
    email,
    name,
    data: {
      password,
    }
  });
}


module.exports = {
  createUserFromProfile,
  getUserFromEmail,
  getTraditionalUser,
  createTraditionalUser,
};
