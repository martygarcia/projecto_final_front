import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ItemReorderEventDetail} from '@ionic/angular/standalone';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TeamPage implements OnInit {

  public items = [1, 2, 3, 4, 5];
  public api_data:string = 'https://pokeapi.co/api/v2/pokemon/';
  public random_pokemon = Math.floor(Math.random() * 100) + 1;

  handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // Before complete is called with the items they will remain in the
    // order before the drag
    console.log('Before complete', this.items);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    this.items = event.detail.complete(this.items);

    // After complete is called the items will be in the new order
    console.log('After complete', this.items);
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.api_data + this.random_pokemon).subscribe((response) => {
      console.log(response);
    });
  }

}
