import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  done: boolean = false;
  fetcherror: boolean = false;
  users: User[] = [];
  addform: FormGroup = this.fb.group({});

  constructor(
    private service: PlaylistService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setUsers();
  }

  private setUsers(): void {
    this.done = false;
    this.fetcherror = false;
    this.service.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.done = true;
        this.fetcherror = false;
      },
      (error: HttpErrorResponse) => {
        console.log('Error while fetching users', error);
        this.done = true;
        this.fetcherror = true;
      }
    );
  }

  retry(): void {
    this.setUsers();
  }

  // 2000-09-13T00:13:09 => 2000/09/13
  showOnlyDateFromDatetime(datetime: any): string {
    return datetime
      .toString()
      .replace('-', '/')
      .split('T')[0]
      .replace('-', '/');
  }

  openAddplaylistDialog(): void {
    let addplaylistDialog = this.dialog.open(AddplaylistDialog);
    addplaylistDialog.afterClosed().subscribe((_) => {
      this.setUsers();
    });
  }
}

/*
  Add playlist dialog (temporary in this file because its no where else used)
 */
@Component({
  selector: 'addplaylist-dialog',
  templateUrl: 'addplaylist-dialog.html',
})
export class AddplaylistDialog implements OnInit {
  form: FormGroup = this.fb.group({});
  private snackbarDuration: number = 4 * 1000;

  constructor(
    private service: PlaylistService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddplaylistDialog>
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
