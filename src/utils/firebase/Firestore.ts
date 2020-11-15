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
    const search = await this.collection.get();

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

  getById(id: string) {
    return this.collection.doc(id);
  }

  abstract getListByFilter(filter: any): Promise<T[]>;
}
