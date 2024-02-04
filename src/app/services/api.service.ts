import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  link = 'https://amctag.me/projects/myschool/auto_api/';

  constructor(private http: HttpClient) { }

  getchildren(school_token: any, mytoken: any) {
    return this.http.get(this.link + 'children.php?school_token=' + school_token + '&parent_id=' + mytoken);
  }

  getagenda(school_token: any, section_id: any, date_created: any, component_id: any) {
    return this.http.get(this.link + 'list.php?school_token=' + school_token + '&section_id=' + section_id + '&date=' + date_created + '&component_id=' + component_id);
  }

  getsingleagenda(school_token: any, component_id: any, agenda_id: any) {
    return this.http.get(this.link + 'list.php?school_token=' + school_token + '&component_id=' + component_id + '&id=' + agenda_id);
  }
}