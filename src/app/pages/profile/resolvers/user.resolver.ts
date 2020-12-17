import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromUser from '@app/store/user';
import * as fromRoot from '@app/store';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<fromUser.User | undefined> {
  
  constructor(private store: Store<fromRoot.State>) {}
  
  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): fromUser.User | Observable<fromUser.User | undefined> | Promise<fromUser.User> {
    return this.store.pipe(
      select(fromUser.getUser),
      filter(user => !!user),
      take(1)
    );
  }

}