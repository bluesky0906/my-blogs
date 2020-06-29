import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { FIREBASE_CONFIG } from "./config";

export interface BlogInfo {
  id: string;
  title: string;
  discription: string;
  body: string;
}

export class Env {
  private static singleInstance: Env;

  public readonly firebase: firebase.app.App;
  public readonly firestore: firebase.firestore.Firestore;
  public readonly providerGoogle = new firebase.auth.GoogleAuthProvider();

  private constructor() {
    this.firebase = firebase.initializeApp(FIREBASE_CONFIG);
    this.firestore = this.firebase.firestore();
    //const settings = { timestampsInSnapshots: true };
    //this.firestore.settings(settings);
  }

  public static get instance(): Env {

    if (!this.singleInstance) {
      this.singleInstance = new Env();
    }
    return this.singleInstance;
  }

  public async getBlogs(): Promise<BlogInfo[]> {
    const blogs: BlogInfo[] = []
    const querySnapshot = await this.firestore.collection("blogs").get();
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      blogs.push({ id: doc.id, title: data.title, discription: data.discription, body: data.body })
    });
    return blogs;
  }

  public async getBlog(id: string): Promise<BlogInfo> {
    const querySnapshot = await this.firestore.collection("blogs").doc(id).get();
    const data = querySnapshot.data();
    if (!data) {
      throw new Error('Page not Found');
    }
    return { id: id, title: data.title, discription: data.discription, body: data.body };
  }


  public async setBlog(data: BlogInfo) {
    if (!data.id) {
      await this.firestore.collection("blogs").add({
        title: data.title,
        discription: data.discription,
        body: data.body,
      });
    }
    else {
      await this.firestore.collection("blogs").doc(data.id).set({
        title: data.title,
        discription: data.discription,
        body: data.body,
      });
    }

  }

  public async deleteBlog(id: string) {
    await this.firestore.collection("blogs").doc(id).delete();
  }
}