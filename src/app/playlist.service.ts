import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from './playlist';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private url: string = 'https://localhost:44373';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.url}/playlists`);
  }

  get(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.url}/playlists/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }
}
