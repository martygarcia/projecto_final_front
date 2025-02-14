import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, isFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { flag } from 'ionicons/icons';
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
  IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
  , IonReorder, IonItem, IonReorderGroup, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonProgressBar}
  from '@ionic/angular/standalone';


@Component({
  selector: 'app-pokemon-level',
  templateUrl: './pokemon-level.page.html',
  styleUrls: ['./pokemon-level.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
    IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
    , IonReorder, IonItem, IonReorderGroup, IonButton, IonInfiniteScroll,IonInfiniteScrollContent, IonProgressBar]
})
export class PokemonLevelPage implements OnInit {

  public level_number!: any;
  public level_team:any = [];
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
  public what_is_doing_text:string = ""
  public array_pokemons_cpu!:any
  public array_pokemons_user!:any
  public array_img_pokemons_user!:any
  public number_cpu_pokemons:number = 0
  public number_user_pokemons:number = 0
  public finish_battle:boolean = true
  public win_or_lose:string = "win"
  public url:string = "https://prijecto-final-back-2.onrender.com/"
  // public url:string = "http://localhost:3001/"
  public is_firts_time:boolean = true


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
      this.loadCpuTeam("fuego")
    }


  }
  
  loadCpuTeam(level:string){

    
    this.http.get(this.url + level).subscribe((response) => {
      this.level_team = response;
      console.log(this.level_team);

      this.array_pokemons_cpu = [
        this.level_team[0].poke1,
        this.level_team[0].poke2,
        this.level_team[0].poke3,
        this.level_team[0].poke4,
        this.level_team[0].poke5,
        this.level_team[0].poke6,
      ]

  this.pokemons_fuego_db()

    });
  }

  loadUser() {
    this.http.get(  this.url + 'users/' + this.user.email).subscribe((response:any) => {
      console.log( response);
      console.log(this.user.email);
    });
  }


  goToTeam(){
    this.router.navigate(['/team']);
  }

  pokemons_fuego_db(){
    this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.array_pokemons_cpu[this.number_cpu_pokemons]).subscribe((response) => {
      this.level_fuego_pokemons = response;
      console.log("esto es el pokemon de maquina q va a jugar");
      console.log(this.level_fuego_pokemons)
    
    });
  }

  playLevel(){
    
    this.http.get(  this.url + 'user_team/' + this.user.email).subscribe((response) => {
      console.log(response);
      this.user_team = response;

      this.user_poke = true;

      //pokemons del equipo del usuario

      this.array_pokemons_user = [
        this.user_team[0].poke_position1,
        this.user_team[0].poke_position2,
        this.user_team[0].poke_position3,
        this.user_team[0].poke_position4,
        this.user_team[0].poke_position5,
        this.user_team[0].poke_position6,
      ]

      //imagenes de los pokemon de nuestro equipo

      this.array_img_pokemons_user = [
        this.user_team[0].poke_img1,
        this.user_team[0].poke_img2,
        this.user_team[0].poke_img3,
        this.user_team[0].poke_img4,
        this.user_team[0].poke_img5,
        this.user_team[0].poke_img6,
        
      ]
    

      this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.array_pokemons_user[this.number_user_pokemons]).subscribe((response) => {
        this.user_pokemon_atack = response;
        console.log("obkjeto de usuario")
        console.log(this.user_pokemon_atack)
        this.prueba = response
        this.see_atack = true;
        this.ai_poke = true;
      });
    }); 

    this.what_is_doing_text = "EL RIVAL HA SACADO UN POKEMON, ATENTO"
}

start(){

  this.is_firts_time = false
  console.log("Objetos para saber quien comienza")

  if(this.user_pokemon_atack.stats[5].base_stat < this.level_fuego_pokemons.stats[5].base_stat){
    console.log("empiza la cpu")
    this.what_is_doing_text = "LA CPU ES MAS RAPIDA Y COMENZARA ELLA"
      this.cpu_turn()
  }else{
    console.log("empieza el usuario")
    this.what_is_doing_text = "ERES MAS RAPIDO QUE EL ENEMIGO COMIENZAS TU"
  }
}

atack(what_is_doing:string){

  if(this.is_firts_time == true){
    this.start()
  }

  setTimeout(() => {
    console.log(what_is_doing)

  if(what_is_doing == "atack"){

    let damage = this.calcular_dano()
    console.log("esto el damage")
    console.log(damage)

    this.is_defence_cpu == false

    if(this.is_user_turn == true){

      if(this.ps_cpu > 0 ){

        this.random_move_cpu()

        // compruebo si la cpu va a hacer defensa con el "2" y en caso q lo haga se apliquen los danos correspodientes
        if(this.random_cpu_turn == 2){
          this.ramdomDefence()

          console.log("la cpu se esta defendiendo")

          if(this.ramdon_defence == 1){
            this.ps_cpu =  this.ps_cpu - ((damage  * 0.01)) 
            console.log("defensa 1 " + this.ps_cpu + this.ramdon_defence)
            console.log("Daño con defensa 1 el daño es el normal")
            this.what_is_doing_text = "EL RIVAL HA USADO DEFENSA PERO NO HA TENIDO SUERTE, EL ATAQUE LE HA DADO"
            this.pokemon_is_alive()
    
          }else if(this.ramdon_defence == 2){
            this.ps_cpu =  this.ps_cpu - ((damage  * 0.01) / 3) 
            console.log("daño con defensa 2 " + this.ps_cpu + this.ramdon_defence)
            console.log("Daño con defensa 2 el daño se divide entre 3")
            this.what_is_doing_text = "EL RIVAL HA USADO DEFENSA PERO HA ESQUIEVADO GRAN PARTE DE TU ATAQUE"
            this.pokemon_is_alive()

    
          }else if(this.ramdon_defence == 3) {
            this.ps_cpu =  this.ps_cpu - 0
            console.log("defensa 3 " + this.ps_cpu + " " + this.ramdon_defence)
            console.log("Daño con defensa 3 no tienes ningun tipo daño")
            this.what_is_doing_text = "EL RIVAL HA USADO DEFENSA Y NO LE HAS NI UN RASGUNO "
            this.pokemon_is_alive()

          }
        }else {

          console.log("hola lo hago sin defensa de pokemon")

          this.what_is_doing_text = "EL RIVAL HA TE HA ATACADO"


          this.ps_cpu =  this.ps_cpu - (damage * 0.01)
          console.log(this.ps_cpu)
          this.pokemon_is_alive()

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
  }, 500);
}

pokemon_is_alive(){
  if(this.ps_cpu <= 0){

    this.what_is_doing_text = "EL POKEMON DEL RIVAL SE HA DEBILITADO"
    this.ps_cpu = 1
    console.log("aqui va el nuevo pokemon")
    this.number_cpu_pokemons ++
    console.log(this.number_cpu_pokemons)
    this.pokemons_fuego_db()
    this.winOrLose()
  }else if(this.ps_user <= 0){
    console.log("Has perdido pringado")
    this.number_cpu_pokemons ++
    this.number_user_pokemons ++
    this.ps_user = 1
    this.winOrLose()
  }
}

winOrLose(){
  if(this.number_user_pokemons > 5){
    this.finish_battle = false
    this.win_or_lose = "lose"

  }else if (this.number_cpu_pokemons > 5){
    this.what_is_doing_text = "Has ganado"
    this.finish_battle = false
    this.win_or_lose = "win"
  }
}

ramdomDefence(){
  this.ramdon_defence = Math.floor(Math.random() * 3) + 1;
}

random_move_cpu(){

  this.random_cpu_turn = Math.floor(Math.random() * 2) + 1;


  console.log("este es el turno" + this.random_cpu_turn)
} 
  

cpu_turn(){

  
console.log("esto es el turno de la maquina")
// let cpu_move = 1;

// compruebo si la cpu va a hacer ataque con el "1" y en caso q lo haga se apliquen los danos correspodientes


if(this.random_cpu_turn == 1){
  console.log("dano de la cpu")

  let damage = this.calcular_dano()

  if(this.ps_cpu > 0 ){
    if(this.is_defence_user == true){

      if(this.ramdon_defence == 1){
        this.ps_user =  this.ps_user - ((damage  * 0.01)) 
        console.log("defensa 1 " + this.ps_user + this.ramdon_defence)
        console.log("Daño con defensa 1 el daño es el normal")
        this.pokemon_is_alive()

      }else if(this.ramdon_defence == 2){
        this.ps_user =  this.ps_user - ((damage  * 0.01) / 3) 
        console.log("daño con defensa 2 " + this.ps_user + this.ramdon_defence)
        console.log("Daño con defensa 2 el daño se divide entre 3")
        this.pokemon_is_alive()

      }else if(this.ramdon_defence == 3) {
        this.ps_user =  this.ps_user - 0
        console.log("defensa 3 " + this.ps_user + " " + this.ramdon_defence)
        console.log("Daño con defensa 3 no tienes ningun tipo daño")
        this.pokemon_is_alive()

      }
      this.is_user_turn = false
    }else{
      this.ps_user =  this.ps_user - (damage * 0.01)
      console.log(this.ps_cpu)

      console.log("daño sin defensa" + damage)
      this.pokemon_is_alive()

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

goToHome(){
  this.ps_user = 1
  this.ps_cpu = 1
  this.number_cpu_pokemons = 0
  this.number_user_pokemons = 0
  this.router.navigate(['/home']);
  this.finish_battle = true

}
}
