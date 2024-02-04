import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agendamodal',
  templateUrl: './agendamodal.page.html',
  styleUrls: ['./agendamodal.page.scss'],
})
export class AgendamodalPage {

  @Input() eventData: any[] | any;
  size: any;

  constructor(private modalController: ModalController, private router: Router) { }

  ionViewWillEnter() {
    if (this.eventData) {
      this.size = this.eventData.length;
      console.log(this.size);
    } else {
      this.size = 0;
      console.log(this.size);
    }
  }

  close() {
    this.eventData = [];
    this.modalController.dismiss();
  }

  gopage(path: any, id: any, section_id: any, date: any) {
    this.router.navigate([path], { queryParams: { id, section_id, date } });
  }
}