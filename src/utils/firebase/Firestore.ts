import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export default abstract class Firestore<T> {
  protected collectionName: string;
  protected model: T;

  constructor(collectionName: string, model: T) {
    this.collectionName = collectionName;
    this.model = model;
  }

  get collection() {
    return firestore().collection(this.collectionName);
  }

  getModels(search: FirebaseFirestoreTypes.QuerySnapshot) {
    const models: T[] = [];
    for (const doc of search.docs) {
      // TODO: Fix type problem
      models.push(new this.model({ id: doc.id, ...doc.data() }));
    }

    return models;
  }

  async getList() {
    // TODO: Add order by created
    const search = await this.collection.orderBy('updatedAt', 'desc').get();

    return this.getModels(search);
  }

  async getListWithParams({
    field,
    operator,
    value,
  }: {
    field: string;
    operator: FirebaseFirestoreTypes.WhereFilterOp;
    value: any;
  }) {
    const search = await this.collection
      .where(field, operator, value)
      .where(field, '<=', `${value}z`)
      .get();

    return this.getModels(search);
  }

  async getById(id: string) {
    const doc = await this.collection.doc(id).get();

    return new this.model({ id: doc.id, ...doc.data() });
  }

  createNewDoc(fields: { [key: string]: any }) {
    const date = Date.now();
    return this.collection.add({ ...fields, createdAt: date, updatedAt: date });
  }

  async getDocsByUserId(userId: string) {
    const search = await this.collection
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return this.getModels(search);
  }

  deleteDocById(docId: string) {
    return this.collection.doc(docId).delete();
  }

  async updateDocById(docId: string, fields: { [key: string]: any }) {
    const updatedAt = Date.now();

    await this.collection.doc(docId).update({ ...fields, updatedAt });

    return this.getById(docId);
  }

  abstract getListByFilter(filter: any): Promise<T[]>;
}
