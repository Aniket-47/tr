import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouterConfigService {

  private Routerconfig: any;
  get routerconfig() {
    return this.Routerconfig;
  }
  set routerconfig(config) {
    this.Routerconfig = config;
  }
  private RouterPermission: any;
  get routerPermission() {
    return this.RouterPermission;
  }
  set routerPermission(config) {
    this.RouterPermission = config;
  }
  constructor() { }
}
