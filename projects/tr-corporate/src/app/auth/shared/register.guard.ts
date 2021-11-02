import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterConfigService } from '../../utility/services/router-config.service';
import { Iauth } from '../store/interface/auth';
import { getSelectedRole } from '../store/selectors/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {
  config: any;
  isRoleSelected: boolean = false;
  constructor(
    private router: Router,
    private store: Store<Iauth>,
    configServ: RouterConfigService) {
    this.config = configServ.routerconfig;
    this.store.select(getSelectedRole).subscribe(data => {
      this.isRoleSelected = !!data;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (state.url.startsWith(this.config.AUTH)) {
        if(state.url.startsWith(this.config.REGISTER2) && !this.isRoleSelected){
          this.router.navigate([this.config.REGISTER1]);          
          return false
        } else {
          return true;
        }
      } else {
         return true;
      }  
    }
  
}
