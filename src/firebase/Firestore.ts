import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { FIREBASE_CONFIG } from "./config";

export interface BlogInfo {
  id: string;
  title: string;
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
    const data: BlogInfo[] = []
    const querySnapshot = await this.firestore.collection("blogs").get();
    querySnapshot.forEach((doc: any) => {
      data.push({ id: doc.id, title: doc.data().title })
    });
    return data;
  }

  public async setBlog(title: string): Promise<BlogInfo> {
    const querySnapshot = await this.firestore.collection("blogs").add({
      title: title
    });
    const data = {
      id: querySnapshot.id,
      title: title
    }
    return data;
  }

  public async deleteBlog(id: string) {
    await this.firestore.collection("blogs").doc(id).delete();
  }
}