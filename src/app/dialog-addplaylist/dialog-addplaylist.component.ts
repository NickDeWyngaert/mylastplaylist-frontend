import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';
import { User } from '../user';

@Component({
  selector: 'app-dialog-addplaylist',
  templateUrl: './dialog-addplaylist.component.html',
  styleUrls: ['./dialog-addplaylist.component.css'],
})
export class DialogAddplaylistComponent implements OnInit {
  form: FormGroup = this.fb.group({});
  private snackbarDuration: number = 4 * 1000;

  constructor(
    private service: PlaylistService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogAddplaylistComponent>
  ) {}

  ngOnInit(): void {
    this.initAddForm();
  }

  private initAddForm(): void {
    this.form = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ]),
      dayOfBirth: new FormControl('', [
        Validators.required,
        Validators.nullValidator,
      ]),
    });
  }

  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get dayOfBirth() {
    return this.form.get('dayOfBirth');
  }

  submitNewUserForNewPlaylist(): void {
    let newUser: User = <User>this.form.value;
    this.service.makeNewPlaylistForNewUser(newUser).subscribe(
      (playlist: Playlist) => {
        this.openSnackBar(
          'Succesfully created a new playlist for ' + playlist.user.firstName
        );
        this.closeDialog();
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar('Failed to create new playlist');
        console.error('Failed to create new playlist', error);
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
