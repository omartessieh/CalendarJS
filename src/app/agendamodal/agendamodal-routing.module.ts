import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendamodalPage } from './agendamodal.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamodalPageRoutingModule { }