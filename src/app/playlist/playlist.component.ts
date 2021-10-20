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
  fetcherror: boolean = false;
  userid: number = 0;
  playlist: Playlist | null = null;
  form: FormGroup = this.fb.group({});
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
      this.userid = userid;
      this.getPlaylistFromUserId();
      this.form = this.fb.group({
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

  get title() {
    return this.form.get('title');
  }
  get artist() {
    return this.form.get('artist');
  }
  get link() {
    return this.form.get('link');
  }

  newSong(): void {
    let newSong: Song = <Song>this.form.value;
    let userId: number = this.playlist?.user.id!;
    this.service.addSongToPlaylist(userId, newSong).subscribe(
      (playlist: Playlist) => {
        this.resetAddform();
        this.getPlaylistFromUserId(userId);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to add new song', error);
      }
    );
  }

  resetAddform(): void {
    this.form.reset();
  }
}
