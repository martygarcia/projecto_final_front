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
  public ps_cpu:number = 1
  public ps_user:number = 1
  public is_defence_user:boolean = false
  public is_defence_cpu:boolean = false
  public ramdon_defence:number = 0
  public random_cpu_turn:number = 0

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

    if(this.is_user_turn == true){

      if(this.ps_cpu > 0 ){

        this.ramdomDefence()
        console.log(this.random_cpu_turn)

        if(this.random_cpu_turn == 2){

          if(this.is_defence_cpu == true){

            console.log("defensa de la maquina true")
  
            if(this.ramdon_defence == 1){
  
              this.ps_cpu =  this.ps_cpu - (damage * 0.01)
              console.log(this.ps_cpu)
              console.log("defensa de la cpu y aplicado el daño modificado")
            }else if (this.ramdon_defence == 2){
              this.ps_cpu =  this.ps_cpu - ((damage * 0.01) / 3)
              console.log(this.ps_cpu)
              console.log("defensa de la cpu y aplicado el daño modificado")

            }else {
              this.ps_cpu =  this.ps_cpu - 0
              console.log(this.ps_cpu)
              console.log("defensa de la cpu y aplicado el daño modificado")

            }
  
          }

        }
        this.is_defence_cpu == false
        console.log("hola lo hago sin defensa de pokemon")

        this.ps_cpu =  this.ps_cpu - (damage * 0.01)
        console.log(this.ps_cpu)
  
        if(this.ps_cpu <= 0 ){
          console.log("la cpu ha muerto")
        }
  
        this.is_user_turn = false
        this.is_defence_user = false

        this.cpu_turn()
      }

    }
    // comprobar si el pokemon esta vivo y restar barra de vida
  }else {

    this.is_defence_user = true

    this.ramdomDefence()

    console.log(this.ramdon_defence)

    this.cpu_turn()


  }
}

ramdomDefence(){
  this.random_cpu_turn = Math.floor(Math.random() * 3) + 1;
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

random_move_cpu(){

  this.random_cpu_turn = Math.floor(Math.random() * 2) + 1;


  console.log("este es el turno" + this.random_cpu_turn)
}
  

cpu_turn(){

  
console.log("esto es el turno de la maquina")
// let cpu_move = 1;

this.random_move_cpu()

if(this.random_cpu_turn == 1){
  console.log("dano de la cpu")

  let damage = this.calcular_dano()

  if(this.ps_cpu > 0 ){
    if(this.is_defence_user == true){

      if(this.ramdon_defence == 1){
        this.ps_user =  this.ps_user - ((damage  * 0.01)) 
        console.log("defensa 1 " + this.ps_user + this.ramdon_defence)
        console.log("Daño con defensa 1 el daño es el normal")

      }else if(this.ramdon_defence == 2){
        this.ps_user =  this.ps_user - ((damage  * 0.01) / 3) 
        console.log("daño con defensa 2 " + this.ps_user + this.ramdon_defence)
        console.log("Daño con defensa 2 el daño se divide entre 3")

      }else if(this.ramdon_defence == 3) {
        this.ps_user =  this.ps_user - 0
        console.log("defensa 3 " + this.ps_user + " " + this.ramdon_defence)
        console.log("Daño con defensa 3 no tienes ningun tipo daño")
      }
      this.is_user_turn = false
    }else{
      this.ps_user =  this.ps_user - (damage * 0.01)
      console.log(this.ps_cpu)

      console.log("daño sin defensa" + damage)

    }

    if(this.ps_user <= 0 ){
      console.log("el user ha muerto")
    }

    this.is_user_turn = false

  }
}else {

  console.log("defensa de cpu")
  
  this.is_defence_cpu == true

  
}

  this.is_user_turn = true

}

calcular_dano(){

  let damage:number = 0

  if(this.is_user_turn != true){

    console.log("Daño de la maquina")

    damage = this.level_fuego_pokemons.base_experience / (this.level_fuego_pokemons.stats[1].base_stat * 0.10)

    let numeroRedondeado1: string = damage.toFixed(0);
    let numeroRedondeado1Num: number = parseFloat(numeroRedondeado1)

    damage = numeroRedondeado1Num
    damage.toFixed(1)

    console.log(damage)

    // this.ps_user = (damage * 0.1) - this.ps_cpu
    // console.log(numeroRedondeado1Num)

    // cpu turn
  }else {
    console.log("turno usuario")
    damage = this.user_pokemon_atack.base_experience / (this.user_pokemon_atack.stats[1].base_stat * 0.10)

    let numeroRedondeado1: string = damage.toFixed(0);
    let numeroRedondeado1Num: number = parseFloat(numeroRedondeado1)
    damage.toFixed(1)
    
    damage = numeroRedondeado1Num

    console.log(damage)

    // this.ps_cpu =  this.ps_user - (damage * 0.01)
    // console.log(this.ps_user)
    // user turn
  }

  return damage
}
}
