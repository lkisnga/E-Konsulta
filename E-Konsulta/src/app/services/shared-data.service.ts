import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  list : any = [];
  callInput: string= "";

  set_list(list)
  {
    this.list = list;
    //console.log(this.list);
  }
  get_list()
  {
    return this.list;
  }

  set_callInput(input)
  {
    this.callInput = input;
  }
  get_callInput()
  {
    return this.callInput;
  }

}
