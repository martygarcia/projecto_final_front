import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {NavParams} from '@ionic/angular';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [IonicModule, ModalComponent, FormsModule],
})
export class ModalComponent  implements OnInit {

  name!: string;
  level!: any;
  public number!: number;

  constructor(private modalCtrl: ModalController,private router: Router, private navParams : NavParams) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.router.navigate(['/team']);
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {
    this.number = this.navParams.get('number');
    console.log('ngOnInit', this.navParams.get('number'));

  }

}
