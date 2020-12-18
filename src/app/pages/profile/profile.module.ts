import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProfileRoutingModule } from './profile-routing.module';

import { reducers, effects } from './store';
import { UserResolver } from './resolvers';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    UserResolver
  ],
})
export class ProfileModule { }
