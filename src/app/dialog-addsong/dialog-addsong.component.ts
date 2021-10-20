import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';
import { Song } from '../song';

@Component({
  selector: 'app-dialog-addsong',
  templateUrl: './dialog-addsong.component.html',
  styleUrls: ['./dialog-addsong.component.css'],
})
export class DialogAddsongComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  userid: number = 0;
  private snackbarDuration: number = 4 * 1000;
  private urlRegex =
    /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;

  constructor(
    private service: PlaylistService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogAddsongComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userid: number }
  ) {}

  ngOnInit(): void {
    this.userid = this.data.userid;
    console.log(this.data.userid);
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
      ]),
    });
  }

  get title() {
    return this.form.get('firstName');
  }
  get artist() {
    return this.form.get('artist');
  }
  get link() {
    return this.form.get('link');
  }

  submitSongToPlaylist(): void {
    let newSong: Song = <Song>this.form.value;
    this.service.addSongToPlaylist(this.userid, newSong).subscribe(
      (playlist: Playlist) => {
        this.openSnackBar('Succesfully added song to the playlist');
        this.closeDialog();
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar('Failed to add new song to your playlist');
        console.error('Failed to add new song to your playlist', error);
        this.closeDialog();
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  resetForm(): void {
    this.form.reset();
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: this.snackbarDuration,
    });
  }
}
