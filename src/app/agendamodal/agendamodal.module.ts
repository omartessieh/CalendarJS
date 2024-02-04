import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgendamodalPageRoutingModule } from './agendamodal-routing.module';
import { AgendamodalPage } from './agendamodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendamodalPageRoutingModule
  ],
  declarations: [AgendamodalPage]
})
export class AgendamodalPageModule { }