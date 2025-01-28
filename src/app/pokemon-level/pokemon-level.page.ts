import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



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
  public hola:boolean = false;

  constructor( private route: ActivatedRoute, private http: HttpClient, private router: Router ) { }

  ngOnInit() {
    this.level_number = this.route.snapshot.paramMap.get('data');
    console.log('ngOnInit pokemon level', this.level_number);

    if(this.level_number == 1){

      this.http.get('http://localhost:3001/fuego').subscribe((response) => {
        this.level_fuego = response;
        console.log(this.level_fuego);
      });

    }
  }

  goToTeam(){
    this.router.navigate(['/team']);
  }

  playLevel(){

    this.hola = true;
    console.log(this.hola);

    this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.level_fuego[0].poke1).subscribe((response) => {
      this.level_fuego_pokemons = response;
      this.level_fuego_pokemons = this.level_fuego_pokemons.sprites.front_default
      console.log( this.level_fuego_pokemons.sprites.front_default);


    }); 

}
}
