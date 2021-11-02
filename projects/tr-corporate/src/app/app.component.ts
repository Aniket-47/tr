import { Component } from '@angular/core';
import { ROUTE_PERMISSION, ROUTE_CONFIGS } from './utility/configs/routerConfig';
import { RouterConfigService } from './utility/services/router-config.service';

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
