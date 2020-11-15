const Firestore = jest.createMockFromModule('../Firestore');

Firestore.getList = jest.fn(async () => {
  return [];
});

Firestore.getListWithParams = jest.fn(async () => {
  return [];
});

Firestore.getById = jest.fn(async () => {
  return null;
});

export default Firestore;
