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

  public items:any = [];
  public poke_api_url:string = 'https://pokeapi.co/api/v2/pokemon/';
  public random_pokemon!:any 
  public saved_pokemon!:any

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
    // this.http.get(this.poke_api_url + this.random_pokemon).subscribe((response) => {
    //   console.log(response);
    // });
  }

  randomPokemon(){
    this.random_pokemon = Math.floor(Math.random() * 150).toString();
    this.http.get(this.poke_api_url + this.random_pokemon).subscribe((response) => {
      console.log(response);
      console.log(this.random_pokemon);
      this.saved_pokemon = response;
      
      if(this.items.length < 6){
        this.items.push(this.saved_pokemon);
      }
    });

  }

  resetTeam(){
    this.items = [];
  }

  saveTeam(){ 
    if(this.items.length == 6){

      // Post a la tabla de equipo hace falta saber q user esta logueado

      let team_finish = {
        poke_position1: this.items[0].id,
        poke_position2: this.items[1].id,
        poke_position3: this.items[2].id,
        poke_position4: this.items[3].id,
        poke_position5: this.items[4].id,
        poke_position6: this.items[5].id,
        poke_img1: this.items[0].sprites.front_default,
        poke_img2: this.items[1].sprites.front_default,
        poke_img3: this.items[2].sprites.front_default,
        poke_img4: this.items[3].sprites.front_default,
        poke_img5: this.items[4].sprites.front_default,
        poke_img6: this.items[5].sprites.front_default,
        id_users: 1
      }
      console.log(team_finish)
    //Post 
      this.http.post("http://localhost:3001/add_team", team_finish).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
        },
        (error) => {
          console.error('Error al realizar la solicitud POST:', error);
        }
    );
  } else {
    console.log('Select 6 Pokemon');
    }

  } 
}
