import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemReorderEventDetail} from '@ionic/angular/standalone';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
  IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
  , IonReorder, IonItem, IonReorderGroup, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonProgressBar, ToastController }
  from '@ionic/angular/standalone';


@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
    IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
    , IonReorder, IonItem, IonReorderGroup, IonButton, IonInfiniteScroll,IonInfiniteScrollContent  , IonProgressBar]
})
export class TeamPage implements OnInit {

  public user_team_ids:any = [];
  public user_team:any = [];
  public poke_api_url:string = 'https://pokeapi.co/api/v2/pokemon/';
  public random_pokemon!:any 
  public saved_pokemon!:any
  public user:any
  public user_stats!:any
  public is_load_user_stats:boolean = true
  public array_imgs_load_user:any
  public array_poke_users_load:any[] = []
  public user_load:any
  public url:string = "https://prijecto-final-back-2.onrender.com/"
  // public url:string = "http://localhost:3001/"
  public server_response:any



  handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // Before complete is called with the items they will remain in the
    // order before the drag
    console.log('Before complete', this.user_team);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    this.user_team = event.detail.complete(this.user_team);

    // After complete is called the items will be in the new order
    console.log('After complete', this.user_team);
  }

  constructor(private http: HttpClient, private auth: AuthService, private toastController: ToastController) { }

  ngOnInit() {
    this.auth.user$.subscribe(data => {
      this.user = data

      this.loadUser()
      // createUser();
    });
  }

  loadUser() {
    this.http.get( this.url + 'users/' + this.user.email).subscribe((response:any) => {
      console.log( "esto es el repsonse del user");
      console.log( response);
      this.user_load = response

      if(response == "not found"){
        this.createUser();
      }

      this.http.get(  this.url + 'user_team/' + this.user.email).subscribe((response:any) => {
        this.user_stats = response
        console.log( "esto es el jugardor con su equipo, hola");
        console.log( this.user_stats );

        if(this.user_stats != "user no encontrado pringado"){
  

          this.user_team_ids = [
            this.user_stats[0].poke_position1,
            this.user_stats[0].poke_position2,
            this.user_stats[0].poke_position3,
            this.user_stats[0].poke_position4,
            this.user_stats[0].poke_position5,
            this.user_stats[0].poke_position6,
          ]

          console.log("array de equipo de users")
          console.log(this.user_team)

          
          console.log("ids de los equipos")
          console.log(this.user_team_ids)
          
          console.log(this.user_team)
          for(let i = 0; i < 6; i++){
            this.http.get(this.poke_api_url + this.user_team_ids[i]).subscribe((response) => {
              console.log("esto es la respuesta de los pokemon cartgados en usuarios");

              this.user_team.push(response)
              console.log(this.user_team);

            });
          }
        }
      });
    });
    
  }

  createUser() {

    let new_user = {
      email: this.user.email,
      name: this.user.name
    }

    this.http.post(  this.url + 'add_user', new_user).subscribe((response) => {
      console.log(response);
    });
  }

  randomPokemon(){
    this.random_pokemon = Math.floor(Math.random() * 150).toString();
    this.http.get(this.poke_api_url + this.random_pokemon).subscribe((response) => {
      console.log(response);
      console.log(this.random_pokemon);
      this.saved_pokemon = response;
      
      if(this.user_team.length < 6){
        this.user_team.push(this.saved_pokemon);
      }
    });

  }

  resetTeam(){
    this.user_team = [];
  }

  saveTeam(){ 
    if(this.user_team.length == 6){

      console.log(this.user_team[0].id)
      // Post a la tabla de equipo hace falta saber q user esta logueado

      let team_finish = {
        poke_position1: this.user_team[0].id,
        poke_position2: this.user_team[1].id,
        poke_position3: this.user_team[2].id,
        poke_position4: this.user_team[3].id,
        poke_position5: this.user_team[4].id,
        poke_position6: this.user_team[5].id,
        poke_img1: this.user_team[0].sprites.front_default,
        poke_img2: this.user_team[1].sprites.front_default,
        poke_img3: this.user_team[2].sprites.front_default,
        poke_img4: this.user_team[3].sprites.front_default,
        poke_img5: this.user_team[4].sprites.front_default,
        poke_img6: this.user_team[5].sprites.front_default,
        id_users: this.user_load[0].id
      }

      console.log(team_finish)
    //Post 
      this.http.post(  this.url + "add_team", team_finish).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
        },
        (error) => {
          console.error('Error al realizar la solicitud POST:', error);
        }
    );
  }else if(this.array_poke_users_load.length == 6){

    let team_finish = {
      poke_position1: this.array_poke_users_load[0].id,
      poke_position2: this.array_poke_users_load[1].id,
      poke_position3: this.array_poke_users_load[2].id,
      poke_position4: this.array_poke_users_load[3].id,
      poke_position5: this.array_poke_users_load[4].id,
      poke_position6: this.array_poke_users_load[5].id,
      poke_img1: this.array_poke_users_load[0].sprites.front_default,
      poke_img2: this.array_poke_users_load[1].sprites.front_default,
      poke_img3: this.array_poke_users_load[2].sprites.front_default,
      poke_img4: this.array_poke_users_load[3].sprites.front_default,
      poke_img5: this.array_poke_users_load[4].sprites.front_default,
      poke_img6: this.array_poke_users_load[5].sprites.front_default,
      id_users: this.user_load[0].id
    }

    for(let i = 0; i <= 5; i++){
      this.user_team.push(this.array_poke_users_load[i].id)

      console.log("this items el bucle")
      console.log(this.user_team)
    }


    console.log("esto es items")
    console.log(this.user_team)
    
    this.http.post( this.url + "update_team/", team_finish).subscribe(
  (response: any) => {
    console.log('Respuesta del servidor:', response);
    this.server_response = response
  },
  (error) => {
    console.error('Error al realizar la solicitud POST:', error);
  }
);

  } else {
    console.log('Select 6 Pokemon');
    }

    
  } 

    async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: "El equipo se ha guardado correctamente",
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
