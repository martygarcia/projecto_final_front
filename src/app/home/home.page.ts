import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ModalComponent} from '../modal/modal.component';
import { ModalController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ModalComponent]
})
export class HomePage implements OnInit {

  message = '';

  constructor(private modalCtrl: ModalController, private router: Router) { }

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
  }


    // console.log('levelButton', level);
    // this.router.navigate(['/pokemon-level', level]);
  }

