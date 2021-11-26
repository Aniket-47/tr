import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './advance-search/demo/demo.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PostLoginResolver } from './core/resolvers/post-login.resolver';
// import { AuthGuard } from './utility/guards/auth.guard';
// import { PostLoginResolver } from './utility/resolvers/post-login.resolver';

const routes: Routes = [

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
    resolve: { data: PostLoginResolver }
  },
  {
    path: 'as',
    component: DemoComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
