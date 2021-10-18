import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tasks } from './tasks';



@Injectable({ providedIn: 'root' })
export class TasksService {

    constructor(private http: HttpClient) { }

    // public listTasks(id: string) {
    //     return this.http
    //         .get<Tasks[]>(environment.ApiUrl + '/tasks/' + id);
    // }
}

