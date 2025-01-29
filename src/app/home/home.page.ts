import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ModalComponent} from '../modal/modal.component';
import { ModalController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ModalComponent]
})
export class HomePage implements OnInit {

  message = '';

  public user: any;

  constructor(private modalCtrl: ModalController, private router: Router,private auth: AuthService,private http: HttpClient) { }

  // componente modal

  async openModal(level_number: number) {

    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        number: level_number}
    });
    modal.present();

    modal.onDidDismiss().then((data:any) => {
      if(data != 'cancel'){
      this.router.navigate(['/pokemon-level', data]);
      }
      console.log(data);
    });

    const { role } = await modal.onWillDismiss();

    if (role === 'confirm') {

      // redirigir al nivel correspondiente
      this.message = `Hello, aqui va la pagina de nivel `;
    }
  }

  ngOnInit() {
    this.auth.user$.subscribe(data => {
      this.user = data
      console.log('user', this.user);

      this.loadUser()
      // createUser();
    });

    
  }

  loadUser() {

    this.http.get('http://localhost:3001/users/' + this.user.ema).subscribe((response) => {
      console.log(response);

      if(response == "not found"){
        this.createUser();
      }
    });

  }

  createUser() {

    let new_user = {
      email: this.user.email,
      name: this.user.name,
      nickname: this.user.nickname,
      picture: this.user.picture
    }

    this.http.post('http://localhost:3001/users', new_user).subscribe((response) => {
      console.log(response);
    });
  }


    // console.log('levelButton', level);
    // this.router.navigate(['/pokemon-level', level]);
  }

