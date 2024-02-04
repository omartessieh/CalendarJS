import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AgendamodalPage } from './agendamodal.page';

describe('AgendamodalPage', () => {
  let component: AgendamodalPage;
  let fixture: ComponentFixture<AgendamodalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgendamodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});