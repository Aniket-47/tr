import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [{
  path:'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

},{
  path : 'userdetail',
  component : UserDetailComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
