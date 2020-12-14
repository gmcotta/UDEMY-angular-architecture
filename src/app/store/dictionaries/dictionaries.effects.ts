import {Injectable} from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, of, zip } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';

import { Dictionaries, Dictionary } from './dictionaries.models';
import { ControlItem, Item } from '../../models/frontend';
import * as fromActions from './dictionaries.actions';

type Action = fromActions.All;

const documentToItem = (document: DocumentChangeAction<any>): Item => {
  const data = document.payload.doc.data();
  return {
    id: document.payload.doc.id,
    ...data,
  }
};

const itemToControlItem = (item: Item): ControlItem => ({
  label: item.name,
  value: item.id,
  icon: item.icon,
});

const addDictionary = (items: Item[]): Dictionary => ({
  items,
  controlItems: [...items].map(item => itemToControlItem(item)),
});

@Injectable()
export class DictionariesEffects {
  constructor(
    private actions: Actions,
    private afs: AngularFirestore,
  ) {}

  @Effect()
  read: Observable<Action> = this.actions.pipe(
    ofType(fromActions.Types.READ),
    switchMap(() => {
      return zip(
        this.afs.collection('roles').snapshotChanges().pipe(
          take(1),
          map(items => items.map(document => documentToItem(document))),
        ),
        this.afs.collection('specializations').snapshotChanges().pipe(
          take(1),
          map(items => items.map(document => documentToItem(document))),
        ),
        this.afs.collection('qualifications').snapshotChanges().pipe(
          take(1),
          map(items => items.map(document => documentToItem(document))),
        ),
        this.afs.collection('skills').snapshotChanges().pipe(
          take(1),
          map(items => items.map(document => documentToItem(document))),
        ),
        ).pipe(
          map(([roles, specializations, qualifications, skills]) => {
            const dictionaries: Dictionaries = {
              roles: addDictionary(roles),
              specializations: addDictionary(specializations),
              qualifications: addDictionary(qualifications),
              skills: addDictionary(skills),
            }

            return new fromActions.ReadSuccess(dictionaries);
          }),
          catchError(err => of(new fromActions.ReadError(err.message)))
        )
    })
  )
}