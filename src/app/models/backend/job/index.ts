import firebase from 'firebase/app';

export interface Job {
  title: string;
  salary: number;
  created: firebase.firestore.FieldValue;
  updated: firebase.firestore.FieldValue;
}
