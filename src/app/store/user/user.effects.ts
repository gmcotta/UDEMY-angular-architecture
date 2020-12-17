import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable, from, of } from 'rxjs';
import { 
  map, 
  switchMap, 
  catchError, 
  take, 
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { environment } from '@src/environments/environment';
import { User } from './user.models';
import * as fromActions from './user.actions';
import { NotificationService } from '@app/services';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor (
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  @Effect()
  init: Observable<Action> = this.actions.pipe(
    ofType(fromActions.Types.INIT),
    switchMap(() => this.afAuth.authState.pipe(
      take(1)
    )),
    switchMap(authState => {
      if (authState) {
        return this.afs.doc<User>(`users/${authState.uid}`).valueChanges()
          .pipe(
            take(1),
            map(user => {
              return new fromActions.InitAuthorized(
                authState.uid, 
                user || null
              );
            })
          );
      } else {
        return of(new fromActions.InitUnauthorized());
      }
    })
  )

  @Effect()
  signUpEmail: Observable<Action> = this.actions.pipe(
    ofType(fromActions.Types.SIGN_UP_EMAIL),
    map((action: fromActions.SignUpEmail) => action.credentials),
    switchMap(credentials => from(
      this.afAuth.createUserWithEmailAndPassword(
        credentials.email, 
        credentials.password
      ))
      .pipe(
        tap(() => from(this.afAuth.currentUser
          .then(user => {
            user?.sendEmailVerification(environment.firebase.actionCodeSettings);
            this.router.navigate(['auth', 'email-confirm']);
            })
          )
        ),
        map(signUpState => {
          return new fromActions.SignUpEmailSuccess(signUpState.user?.uid)}
        ),
        catchError(err => {
          this.notificationService.error(err.message);
          return of(new fromActions.SignUpEmailError(err.message));
        })
      )
    )
  )

  @Effect()
  signInEmail: Observable<Action> = this.actions.pipe(
    ofType(fromActions.Types.SIGN_IN_EMAIL),
    map((action: fromActions.SignInEmail) => action.credentials),
    switchMap(credentials => from(
      this.afAuth.signInWithEmailAndPassword(
        credentials.email, 
        credentials.password
      ))
      .pipe(
        switchMap(signInState => {
          return this.afs.doc<User>(`users/${signInState.user?.uid}`)
            .valueChanges().pipe(
              take(1),
              tap(() => this.router.navigate(['/'])),
              map(user => new fromActions.SignInEmailSuccess(
                signInState.user?.uid, 
                user || null
              ))
            )
        }),
        catchError(err => {
          this.notificationService.error(err.message);
          return of(new fromActions.SignInEmailError(err.message));
        })
      )
    )
  )

  @Effect()
  signOut: Observable<Action> = this.actions.pipe(
    ofType(fromActions.Types.SIGN_OUT),
    switchMap(() => from(this.afAuth.signOut()).pipe(
      map(() => new fromActions.SignOutSuccess()),
      catchError(err => of(new fromActions.SignOutError(err.message)))
    ))
  )

  @Effect()
  create: Observable<Action> = this.actions.pipe(
    ofType(fromActions.Types.CREATE),
    map((action: fromActions.Create) => action.user),
    withLatestFrom(this.afAuth.authState.pipe(take(1))),
    map(([user, state]) => ({
      ...user,
      uid: state?.uid,
      email: state?.email,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })),
    switchMap((user: User) => 
      from(this.afs.collection('users').doc(user.uid).set(user)).pipe(
        tap(() => this.router.navigate(['/profile', user.uid])),
        map(() => new fromActions.CreateSuccess(user)),
        catchError(err => of(new fromActions.CreateError(err.message)))
      )
    )
  )

  @Effect()
  update: Observable<Action> = this.actions.pipe(
    ofType(fromActions.Types.UPDATE),
    map((action: fromActions.Update) => action.user),
    switchMap(user => 
      from(this.afs.collection('users').doc(user.uid).set(user)).pipe(
        tap(() => this.router.navigate(['/profile', user.uid])),
        map(() => new fromActions.UpdateSuccess(user)),
        catchError(err => of(new fromActions.UpdateError(err.message)))
      )
    )
  )


}