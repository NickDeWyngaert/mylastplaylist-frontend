import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Song } from '../song';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  done: boolean = false;
  playlist: Playlist | null = null;
  addform: FormGroup = this.fb.group({});
  private urlRegex =
    /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PlaylistService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      let userid: number = <number>params['id'];
      this.getPlaylistWithUserId(userid);
      this.addform = this.fb.group({
        title: new FormControl('', [
          Validators.required,
          Validators.nullValidator,
        ]),
        artist: new FormControl('', [
          Validators.required,
          Validators.nullValidator,
        ]),
        link: new FormControl('', [
          Validators.required,
          Validators.nullValidator,
          //Validators.pattern(this.urlRegex), // doesn't work anymore?
        ]),
      });
    });
  }

  private getPlaylistWithUserId(id: number): void {
    this.service.getPlaylist(id).subscribe(
      (playlist: Playlist) => {
        this.playlist = playlist;
        this.done = true;
      },
      (error: HttpErrorResponse) => {
        console.log('Error while fetching playlist with id', error);
      }
    );
  }

  get title() {
    return this.addform.get('title');
  }
  get artist() {
    return this.addform.get('artist');
  }
  get link() {
    return this.addform.get('link');
  }

  newSong(): void {
    let newSong: Song = <Song>this.addform.value;
    let userId: number = this.playlist?.user.id!;
    this.service.addSongToPlaylist(userId, newSong).subscribe(
      (playlist: Playlist) => {
        this.resetAddform();
        this.getPlaylistWithUserId(userId);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to add new song', error);
      }
    );
  }

  resetAddform(): void {
    this.addform.reset();
  }
}
