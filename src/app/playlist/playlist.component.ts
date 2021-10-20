import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddsongComponent } from '../dialog-addsong/dialog-addsong.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  done: boolean = false;
  fetcherror: boolean = false;
  userid: number = 0;
  playlist: Playlist | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PlaylistService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let userid: number = <number>params['id'];
      this.userid = userid;
      this.getPlaylistFromUserId();
    });
  }

  // default is the userid from the url
  private getPlaylistFromUserId(userid: number = this.userid): void {
    this.done = false;
    this.fetcherror = false;
    this.service.getPlaylist(userid).subscribe(
      (playlist: Playlist) => {
        this.playlist = playlist;
        this.done = true;
        this.fetcherror = false;
      },
      (error: HttpErrorResponse) => {
        this.done = true;
        this.fetcherror = true;
        console.log('Error while fetching playlist with id', error);
      }
    );
  }

  retry(): void {
    this.getPlaylistFromUserId();
  }

  openAddSongDialog(): void {
    let addsongDialog = this.dialog.open(DialogAddsongComponent);
    addsongDialog.afterClosed().subscribe((_) => {
      this.getPlaylistFromUserId();
    });
  }
}
