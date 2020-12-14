import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '404',
    loadChildren: () => import('./pages/not-found/not-found.module')
      .then(m => m.NotFoundModule),
  },
  {
    path:  'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module')
      .then(m => m.WelcomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule { }
