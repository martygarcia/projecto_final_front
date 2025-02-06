import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { flag } from 'ionicons/icons';



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
  public user_pokemon_atack:any;
  public pokemon_user!:any
  public is_user_turn:boolean = true
  public is_finished:boolean = false
  public prueba!:any 

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
      
    });
    
    this.http.get('http://localhost:3001/user_team/' + this.user.email).subscribe((response) => {
      console.log(response);
      this.user_team = response;
      this.pokemon_user = this.user_team[0]

      this.user_poke = true;
    

      this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.user_team[0].poke_position1).subscribe((response) => {
        this.user_pokemon_atack = response;
        console.log("obkjeto de usuario")
        console.log(this.user_pokemon_atack)
        this.prueba = response
        this.see_atack = true;
        this.ai_poke = true;


      });


      // this.start()

    }); 
}

atack(what_is_doing:string){

  console.log(what_is_doing)

  if(what_is_doing == "atack"){

    let damage = this.calcular_dano()
    console.log(damage)
    // comprobar si el pokemon esta vivo y restar barra de vida
    // cpu turn
  }else {
    
    // user turn
    this.cpu_turn()
  }
}

start(){

  console.log("aqui funciona")

  console.log( "numero de velocidad de pokemon de usuario ")
  console.log(this.prueba)
  console.log( "numero de velocidad de pokemon " + this.level_fuego_pokemons.stats[5].base_stat)

  
  // if(this.level_fuego_pokemons.stats[5].base_stat > this.user_pokemon_atack.stats[5].base_stat){
  //   this.is_user_turn = false
  //   console.log("turno de maquina")
  //   this.cpu_turn()
  // }else {
  //   this.is_user_turn = true
  //   console.log("turno de user")
    
  // }

}

cpu_turn(){


  this.is_user_turn = true

}

calcular_dano(){

  console.log("Ataque base")
  console.log(this.level_fuego_pokemons.stats[1].base_stat)

  let damage:number = 0

  if(this.is_user_turn != true){

    console.log("Daño de la maquina")

    damage = this.level_fuego_pokemons.base_experience / (this.level_fuego_pokemons.stats[1].base_stat * 0.10)

    let numeroRedondeado1: string = damage.toFixed(0);
    let numeroRedondeado1Num: number = parseFloat(numeroRedondeado1)

    damage = numeroRedondeado1Num
    damage.toFixed(1)
    // console.log(numeroRedondeado1Num)

    // cpu turn
  }else {
    console.log("turno usuario  ")
    damage = this.user_pokemon_atack.base_experience / (this.user_pokemon_atack.stats[1].base_stat * 0.10)

    let numeroRedondeado1: string = damage.toFixed(0);
    let numeroRedondeado1Num: number = parseFloat(numeroRedondeado1)
    damage.toFixed(1)
    
    damage = numeroRedondeado1Num
    // user turn
  }

  return damage
}
}
