import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  constructor(private service: PlaylistService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setUsers();
    this.setAddForm();
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

  private setAddForm(): void {
    this.addform = this.fb.group({
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
    return this.addform.get('firstName');
  }
  get lastName() {
    return this.addform.get('lastName');
  }
  get dayOfBirth() {
    return this.addform.get('dayOfBirth');
  }

  newUser(): void {
    let newUser: User = <User>this.addform.value;
    this.service.makeNewPlaylistForNewUser(newUser).subscribe(
      (user: User) => {
        this.resetAddform();
        this.setUsers();
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to add new user', error);
      }
    );
  }

  resetAddform(): void {
    this.addform.reset();
  }
}
