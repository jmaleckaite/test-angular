import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Content {
    constructor(private http: HttpClient) { }
    public getJSON(): Observable<any> {
        //using own created proxy for dealing with the CORS issue
        return this.http.get("https://floating-gorge-26840.herokuapp.com/https://firebasestorage.googleapis.com/v0/b/testmainstreaming.appspot.com/o/library.json?alt=media&token=6fe008b7-5bab-4acd-bee1-a306649dc74f");
    } 
}

