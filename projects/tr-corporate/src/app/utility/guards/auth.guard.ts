import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';
import { Observable } from 'rxjs';
import { LSkeys } from '../configs/app.constants';
import { RouterConfigService } from '../services/router-config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  loggedin: boolean;

  config: any;
  constructor(
    private router: Router,
    configServ: RouterConfigService,
    private LsService: LstorageService
  ) {
    this.config = configServ.routerconfig;
    this.loggedin = !!this.LsService.getItem(LSkeys.BREARER_TOKEN);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (state.url.startsWith(this.config.DASHBOARD)) {
      if (this.loggedin) return true;
      else {
        this.router.navigate([this.config.AUTH]);
        return false;
      }
    } else {
      if (this.loggedin) {
        this.router.navigate([this.config.DASHBOARD]);
        return false;
      } else return true;
    }
  }
}
