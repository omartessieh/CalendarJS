import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AgendamodalPage } from '../agendamodal/agendamodal.page';

interface CalendarDay {
  day: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  school_token: any;
  mytoken: any;
  language: any;
  local_dictionary: any;
  dictionary: any;

  datachildren: any;
  children: any;
  childrenlength: any;

  dataagenda: any;
  agenda: any;
  agendalength: any;

  agendaDates: string[] = [];
  daterange: any;

  section: any = [];
  section_id: any;
  i: any;

  currentMonth: string;
  calendarDays: number[] | any;
  selectedDate: Date;
  events: { [date: string]: string[] } = {};
  highlightedDates: Date[] = [];
  selectedEvents: any[] | any;
  EventsSize: any;
  currentMonthNumber: any;
  selectedAgendaEvents: any[] | any;

  highlightedAgendaDates: any[] = [
    '2023-06-1',
    '2023-06-5',
    '2023-06-8',
    '2023-08-10',
    '2023-08-15',
    '2023-08-14',
    '2023-08-21',
    '2023-10-7',
    '2023-10-20',
    '2023-10-25'
  ];

  constructor(private modalController: ModalController, private router: Router, private apiService: ApiService) {
    this.school_token = 14;
    this.mytoken = 17;

    this.currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
    this.selectedDate = new Date();
    this.renderCalendar();
    this.getchildrenTwo();
    this.currentDate();

    const currentYear = this.selectedDate.getFullYear();
    const currentMonth = this.selectedDate.getMonth();

    this.highlightedDates = this.getHighlightedDatesForMonth(currentYear, currentMonth);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  ionViewWillEnter() {
    this.getchildrenTwo();
    this.currentDate();
  }

  getchildrenTwo() {
    this.apiService.getchildren(this.school_token, this.mytoken).subscribe((data) => {
      this.datachildren = JSON.parse(JSON.stringify(data));
      this.children = this.datachildren.objects;
      this.childrenlength = this.children.length;
      const sectionIdSet = new Set();
      for (let i = 0; i < this.childrenlength; i++) {
        sectionIdSet.add(this.children[i].section_id);
      }
      this.section = Array.from(sectionIdSet);
      const queryArray = [this.section];
      this.i = queryArray.join(',');
      this.section_id = queryArray.join(',');
      if (this.daterange != null) {
        this.getagenda(this.section_id, this.daterange);
      }
    });
  }

  togglechildren(event: any) {
    var ev = event.detail.value;
    this.section_id = '';
    if (ev == '0') {
      this.section_id = this.i;
      this.getagenda(this.section_id, this.daterange);
    } else {
      this.section_id = event.detail.value;
      this.getagenda(this.section_id, this.daterange);
    }
  }

  getagenda(section_id: any, date: any) {
    this.apiService.getagenda(this.school_token, section_id, date, 2).subscribe((data) => {
      this.dataagenda = JSON.parse(JSON.stringify(data));
      this.agenda = this.dataagenda.objects;
      this.agendalength = this.agenda.length;
    });
  }

  currentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const dateRange = `'${formattedDate}' And '${formattedDate}'`;
    this.daterange = dateRange;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////

  prevMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.renderCalendar();
  }

  updateCurrentMonth() {
    this.currentMonth = this.selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    this.currentMonthNumber = this.selectedDate.getMonth() + 1;
  }

  renderCalendar() {
    const firstDay = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1).getDay();
    const lastDay = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0).getDate();
    this.calendarDays = Array.from({ length: lastDay }, (_, i) => i + 1);
    this.updateCurrentMonth();

    this.highlightedDates = this.getHighlightedDatesForMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
  }

  getMonthNumber(monthName: string): number {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(monthName) + 1;
  }

  // Add a function to get highlighted dates for a specific month and year
  getHighlightedDatesForMonth(year: number, month: number): Date[] {
    this.highlightedDates = [];
    this.highlightedAgendaDates.forEach(date => {
      const dateParts = date.split('-');
      const dateYear = parseInt(dateParts[0]);
      const dateMonth = parseInt(dateParts[1]) - 1; // Months are zero-based

      if (dateYear === year && dateMonth === month) {
        const day = parseInt(dateParts[2]);
        this.highlightedDates.push(new Date(dateYear, dateMonth, day));
      }
    });
    return this.highlightedDates;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  isSelected(day: number): boolean {
    const selectedDate = this.selectedDate;

    return (
      day === selectedDate.getDate() &&
      selectedDate.getFullYear() === new Date().getFullYear() &&
      selectedDate.getMonth() === new Date().getMonth()
    );
  }

  hasEvent(day: number): boolean {
    const dateKey = this.getDateKey(day);
    return this.events[dateKey] !== undefined;
  }

  selectDate(day: number) {
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), day);
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth() + 1;
    const dayOfMonth = this.selectedDate.getDate();

    const formattedDate = `${year}-${month}-${dayOfMonth}`;

    this.daterange = `'${formattedDate}' And '${formattedDate}'`;

    this.getagenda(this.section_id, this.daterange);

    const dateKey = this.getDateKey(day);
    this.apiService.getagenda(this.school_token, this.section_id, formattedDate, 2).subscribe((data) => {
      const i = JSON.parse(JSON.stringify(data));
      this.selectedEvents = i.objects;
      this.renderCalendar();
      this.selectedAgendaEvents = this.getAgendaEventsForDate(dateKey);
      this.openModalWithData(this.agenda);
    });
  }

  private getAgendaEventsForDate(dateKey: string): any[] {
    return this.agenda.filter((agenda: any) => {
      const agendaDate = new Date(agenda.date);
      this.EventsSize = this.agenda.length;
      console.log(this.EventsSize);
      return this.getDateKey(agendaDate.getDate()) === dateKey;
    });
  }

  private getDateKey(day: number): string {
    return `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth() + 1}-${day}`;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // private addSampleHighlightedDates(dates: any[]) {
  //   dates.forEach(date => {
  //     const dateParts = date.split('-');
  //     const year = parseInt(dateParts[0]);
  //     const month = parseInt(dateParts[1]) - 1; // Months are zero-based
  //     const day = parseInt(dateParts[2]);

  //     this.highlightedDates.push(new Date(year, month, day));
  //   });
  // }

  isHighlighted(day: number): boolean {
    const dateKey = this.getDateKey(day);
    return this.highlightedDates.some(date => this.getDateKey(date.getDate()) === dateKey);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  async openModalWithData(data: any) {
    const modal = await this.modalController.create({
      component: AgendamodalPage, // Replace with the actual modal component
      componentProps: {
        eventData: data  // Pass the data to the modal
      }
    });

    await modal.present();
  }

  gopage(path: any, id: any, section_id: any, date: any) {
    this.router.navigate([path], { queryParams: { id, section_id, date } });
  }
}