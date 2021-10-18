import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
})
export class PlaylistsComponent implements OnInit {
  done: boolean = false;
  playlists: Playlist[] = [];

  constructor(private service: PlaylistService) {}

  ngOnInit(): void {
    this.setPlaylists();
  }

  private setPlaylists(): void {
    this.service.getAll().subscribe(
      (playlists: Playlist[]) => {
        this.playlists = playlists;
        this.done = true;
      },
      (error: HttpErrorResponse) => {
        console.log('Error while fetching playlists', error);
      }
    );
  }
}
