import { Component } from '@angular/core';
import { RouterConfigService } from '@tr/src/app/utility/services/routeGuards/router-config.service';
import { routerPermission, ROUTE_CONFIGS } from './utility/routerConfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tr-corporate';
  constructor(private configServ: RouterConfigService) {
    this.configServ.routerconfig = ROUTE_CONFIGS;
    configServ.routerPermission = routerPermission;
  }
}
