import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as fromUser from '@app/store/user';
import * as fromRoot from '@app/store';

@Injectable()
export class UserResolver implements Resolve<fromUser.User | undefined> {
  
  constructor(private store: Store<fromRoot.State>) {}
  
  resolve(): Observable<fromUser.User | undefined> {
    return this.store.pipe(
      select(fromUser.getUser),
      filter(user => {
        console.log('user resolver', user, !!user);
        return !!user;
      }),
      take(1)
    );
  }
}
