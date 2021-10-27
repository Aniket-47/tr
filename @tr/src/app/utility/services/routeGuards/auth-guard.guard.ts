import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterConfigService } from './router-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  loggedin: boolean = true;

  config: any;
  constructor(private router: Router, configServ: RouterConfigService) {
    this.config = configServ.routerconfig;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url.startsWith(this.config.DASHBOARD)) {
      if (this.loggedin)
        return true;
      else {
        this.router.navigate([this.config.AUTH]);
        return false;
      }
    }
    else {
      if (this.loggedin) {
        this.router.navigate([this.config.DASHBOARD]);
        return false;
      }
      else
        return true;
    }
  }

}
