import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from './playlist';
import { Song } from './song';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private url: string = 'https://localhost:44373';
  private resource: string = 'playlists';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.url}/${this.resource}`);
  }

  newUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/${this.resource}`, user);
  }

  get(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.url}/${this.resource}/${id}`);
  }

  post(id: number, song: Song): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.url}/${this.resource}/${id}`, song);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/${this.resource}/users`);
  }
}
