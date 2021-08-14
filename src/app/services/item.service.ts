import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url = 'https://amador-test.herokuapp.com/shopping';
  private httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(private http:HttpClient) { }

  /* getItems(){
    return [
      {
        id: 0,
        title: 'Chocolate Bar',
        price: 20,
        quantity: 4,
      },
      {
        id: 0,
        title: 'Pizza',
        price: 79,
        quantity: 4,
      },
      {
        id: 0,
        title: 'Hamburger',
        price: 80,
        quantity: 4,
      }
    ];
  } */

  getItems():Observable<Item[]>{
    return this.http.get<Item[]>(this.url);
  }

  deleteItem(item:Item):Observable<Item>{
    return this.http.delete<Item>(`https://amador-test.herokuapp.com/shopping/${item.id}`);
    //return this.http.delete<Item>(this.url + item.id);
  }

  addItem(item:Item):Observable<Item>{
    return this.http.post<Item>(this.url, item, this.httpOptions);
  }

  
}