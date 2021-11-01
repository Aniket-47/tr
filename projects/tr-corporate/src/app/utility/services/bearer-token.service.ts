import { Injectable } from '@angular/core';

import { LstorageService } from '@tr/src/app/utility/services/lstorage.service';

@Injectable({
  providedIn: 'root'
})
export class BearerTokenService {

  constructor(private LstorageServ: LstorageService) { }

  setBearerToken(token: string) {
    this.LstorageServ.store("bearerToken", token);
  }

  getBearerToken() {
    return this.LstorageServ.getItem("bearerToken");
  }


}
