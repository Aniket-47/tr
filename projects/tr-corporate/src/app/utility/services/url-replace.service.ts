import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlReplaceService {

  constructor() { }
  replace(url: string, ...values: string[]) {
    let newUrl = url.split('/');
    return newUrl.map((e, i) => {
      return e.includes('$') ? values.shift() : e;

    }).join('/')
  }
}
