module.exports = jest.fn(() => ({
  currentUser: {},
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn(),
  onUserChanged: jest.fn(),
}));
