import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];
  total:number = 0;
  constructor(private itemService:ItemService) { }

  ngOnInit(): void {

    /* this.items = [
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
      }
    ];*/

    //this.items = this.itemService.getItems();
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.getTotal();
    });
  } 

  deleteItem(item: Item){
    this.items = this.items.filter(i => i.id != item.id);
    this.itemService.deleteItem(item).subscribe();
    this.getTotal();
  }

  addItem(item:Item){
    console.log(item);
    this.itemService.addItem(item).subscribe(i => {
      this.items.unshift(i);
      this.getTotal();
    });
  }

  getTotal(){
    this.total = this.items
    .map(item => item.price * item.quantity)
    .reduce((acc, item) => acc += item, 0);
  }


}