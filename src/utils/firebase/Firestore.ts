import firestore from '@react-native-firebase/firestore';

export default class Firestore {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  get collection() {
    return firestore().collection(this.collectionName);
  }

  async getList() {
    console.log('GETTING LIST');
    const querySnapshot = await this.collection
      .orderBy('createdAt', 'desc')
      .get();

    console.log('Snapshot', querySnapshot);

    querySnapshot.forEach((docSnap) => {
      console.log('Doc Data', docSnap.data());
    });

    return querySnapshot;
  }

  getPostById(postId: string) {
    return this.collection.doc(postId);
  }
}
