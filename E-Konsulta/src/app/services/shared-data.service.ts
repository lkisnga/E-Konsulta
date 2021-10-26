import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  list : any = [];

  set_list(list)
  {
    this.list = list;
    //console.log(this.list);
  }
  get_list()
  {
    return this.list;
  }

}
