import { Component } from '@angular/core';
import { RouterConfigService } from '@tr/src/app/utility/services/routeGuards/router-config.service';
import { ROUTE_PERMISSION, ROUTE_CONFIGS } from './utility/configs/routerConfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tr-corporate';
  constructor(private configServ: RouterConfigService) {
    this.configServ.routerconfig = ROUTE_CONFIGS;
    this.configServ.routerPermission = ROUTE_PERMISSION;
  }
}
