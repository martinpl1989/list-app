import { Component, OnInit } from '@angular/core';
import { Item } from './app.model';
import { Service } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CRUD App';
  Items: Item[] = [];
  newItem: Item = { id: 0, description: '' };
  selectedItem: Item | null = null;

  constructor(private Service: Service) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.Service.getItems().subscribe(items => {
      this.Items = items;
    });
  }

  addItem(): void {
    if (this.newItem.description?.trim() !== '') {
      this.Service.addItem(this.newItem).subscribe(() => {
        this.loadItems();
        this.newItem = { id: 0, description: '' };
      });
    }
  }

  selectItem(item: Item): void {
    this.selectedItem = { ...item }; // Create a copy to avoid direct modification
  }

  updateItem(): void {
    if (this.selectedItem) {
      this.Service.updateItem(this.selectedItem.id, this.selectedItem).subscribe(() => {
        this.loadItems();
        this.selectedItem = null;
      });
    }
  }

  deleteItem(id: number): void {
    this.Service.deleteItem(id).subscribe(() => {
      this.loadItems();
      this.selectedItem = null;
    });
  }
}
