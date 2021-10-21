import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [{
  path:'auth',
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
},
  {
    path: 'adduser',
    component: AddUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
