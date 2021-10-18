import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from './playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private url: string = '';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.url}`);
  }

  get(firstname: string, lastname: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.url}`);
  }
}
