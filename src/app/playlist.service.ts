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

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.url}/${this.resource}`);
  }

  makeNewPlaylistForNewUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/${this.resource}`, user);
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.url}/${this.resource}/${id}`);
  }

  addSongToPlaylist(userid: number, song: Song): Observable<Playlist> {
    return this.http.post<Playlist>(
      `${this.url}/${this.resource}/${userid}`,
      song
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/${this.resource}/users`);
  }
}
