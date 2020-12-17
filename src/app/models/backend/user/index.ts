import firebase from 'firebase/app';

import { Employee, Recruiter } from './roles';

export * from './roles';
export interface User {
  uid: string | undefined;
  name: string;
  photoURL: string;
  email: string | null | undefined;
  country: string;
  about?: string;
  roleId: string;
  role: Employee | Recruiter;
  created: firebase.firestore.FieldValue;
  updated?: firebase.firestore.FieldValue;
}
