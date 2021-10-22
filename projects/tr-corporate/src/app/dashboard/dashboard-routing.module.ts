import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashabordComponent } from './dashabord.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {
    path:'',
    component: DashabordComponent,
    children:[
      {
        path: '',
        component: StatsComponent
      },
      {
        path:'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path:'',
        pathMatch:'full',
        redirectTo: ''
      },
      {
        path:'**',
        pathMatch:''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
