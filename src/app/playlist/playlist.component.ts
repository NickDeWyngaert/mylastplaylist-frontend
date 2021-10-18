import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  done: boolean = false;
  playlist: Playlist | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PlaylistService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let userid: number = <number>params['id'];
      this.getPlaylistWithUserId(userid);
    });
  }

  private getPlaylistWithUserId(id: number) {
    this.service.get(id).subscribe(
      (playlist: Playlist) => {
        this.playlist = playlist;
        this.done = true;
      },
      (error: HttpErrorResponse) => {
        console.log('Error while fetching playlist with id', error);
      }
    );
  }
}
