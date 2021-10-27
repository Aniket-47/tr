import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterConfigService } from './router-config.service';

@Injectable({
  providedIn: 'root'
})
export class GenericGuardGuard implements CanActivate {

  config: any;
  permissions: any;
  constructor(private router: Router, configServ: RouterConfigService) {
    this.config = configServ.routerconfig;
    this.permissions = configServ.routerPermission;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    for (let key in this.config) {
      if (state.url === this.config[key]) {
        if (!this.permissions[key])
          this.router.navigate([this.config.DASHBOARD])
        return this.permissions[key];
      }

    }


    return true;
  }

}
