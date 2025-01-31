import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';



@Component({
  selector: 'app-pokemon-level',
  templateUrl: './pokemon-level.page.html',
  styleUrls: ['./pokemon-level.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PokemonLevelPage implements OnInit {

  public level_number!: any;
  public level_fuego:any = [];
  public level_fuego_pokemons:any = [];
  public ai_poke:boolean = false;
  public user: any;
  public user_team!: any;
  public user_poke:boolean = false;
  public see_atack:boolean = false;
  public pokemon_atack:any = [];
  public user_pokemon_atack:any = [];

  constructor(private auth: AuthService, private route: ActivatedRoute, private http: HttpClient, private router: Router ) { }

  ngOnInit() {

    this.auth.user$.subscribe(data => {
      this.user = data
      console.log('user', this.user);

      this.loadUser()
      // createUser();
    });

    this.level_number = this.route.snapshot.paramMap.get('data');
    console.log('ngOnInit pokemon level', this.level_number);

    if(this.level_number == 1){

      this.http.get('http://localhost:3001/fuego').subscribe((response) => {
        this.level_fuego = response;
        console.log(this.level_fuego);
      });



    }
  }

  loadUser() {
    this.http.get('http://localhost:3001/users/' + this.user.email).subscribe((response:any) => {
      console.log( response);
      console.log(this.user.email);
    });
  }


  goToTeam(){
    this.router.navigate(['/team']);
  }

  playLevel(){


    this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.level_fuego[0].poke1).subscribe((response) => {
      this.level_fuego_pokemons = response;
      console.log( this.level_fuego_pokemons);

      this.level_fuego_pokemons = this.level_fuego_pokemons.sprites.front_default
      this.ai_poke = true;
    });
    
    this.http.get('http://localhost:3001/user_team/' + this.user.email).subscribe((response) => {
      console.log(response);
      this.user_team = response;

      this.user_poke = true;
    

      this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.user_team[0].poke_position1).subscribe((response) => {
        console.log(response);
        this.user_pokemon_atack = response;

        this.see_atack = true;
      });

    }); 
}

atack(atack_number:any){
  console.log(atack_number);
}
}
