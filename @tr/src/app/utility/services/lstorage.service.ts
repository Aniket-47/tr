import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LstorageService {

  constructor() {
    if(window && !window.localStorage){
      console.error("Browser does not support localstorage")
    }
  }

  store(key:string, data: string){
    localStorage.setItem(key, data);
  }

  remove(key: string){
    localStorage.removeItem(key);
  }

  getItem(key: string){
    return localStorage.getItem(key);
  }

  clear(){
    localStorage.clear();
  }
}
