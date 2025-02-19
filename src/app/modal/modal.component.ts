import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {NavParams} from '@ionic/angular';
import { IonContent, IonHeader, IonToolbar, IonTitle,
  IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
  IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
  , IonReorder, IonItem, IonReorderGroup, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonProgressBar}
  from '@ionic/angular/standalone';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [IonContent, IonHeader, IonToolbar, IonTitle,
    IonList, IonIcon, IonMenu, IonLabel, IonRouterOutlet,
    IonMenuButton, IonMenuToggle, IonListHeader, IonButtons, IonGrid, IonCol,IonRow
    , IonReorder, IonItem, IonReorderGroup, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonProgressBar],
})
export class ModalComponent  implements OnInit {

  name!: string;
  level!: any;
  public number!: number;
  public message!: any;

  constructor(private modalCtrl: ModalController,private router: Router, private navParams : NavParams) {}

  async cancel() {
    await this.modalCtrl.dismiss('cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.number, 'confirm');
  }

  ngOnInit() {
    this.number = this.navParams.get('number');
    console.log('ngOnInit', this.navParams.get('number'));
  }

}
