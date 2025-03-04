import Clarify from 'clarify-sdk';

const clarify = new Clarify({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI',
});

export function initializeClarify() {
  clarify.init();
}

export function login() {
  clarify.login();
}

export function logout() {
  clarify.logout();
}

export function getUserProfile() {
  return clarify.getUserProfile();
}
