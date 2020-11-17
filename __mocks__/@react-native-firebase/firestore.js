const collection = {
  orderBy: jest.fn(() => collection),
  where: jest.fn(() => collection),
  get: jest.fn(() => ({
    docs: [],
  })),
};

module.exports = () => ({
  collection: jest.fn(() => ({ ...collection })),
});
