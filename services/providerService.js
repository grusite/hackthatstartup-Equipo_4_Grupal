/* istanbul ignore next */
const { FB } = require('fb')
const { OAuth2Client } = require('google-auth-library')

var app = require('../app');
const githubAPI = require('github-oauth-express');

// In your App's Github Login button the redirection link must be
// `https://github.com/login/oauth/authorize?client_id=${YOUR_CLIENT_ID}`;

exports.getProfileFromGithub = async () => {

  try {

    const authToken = await githubAPI(
      app, // Send your app instance to get OAuth Access
      {
        clientId: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_SECRETID,
        redirectURL: '/oauth-callback'
      }
    )

  } catch (err) {
    throw new Error('invalid github ids')
  }
  return { authToken }
}
