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
  users: User[] = [];
  addform: FormGroup = this.fb.group({});

  constructor(private service: PlaylistService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setUsers();
  }

  private setUsers(): void {
    this.service.getAllUsers().subscribe(
      (users: User[]) => {
        console.log(users);
        this.users = users;
        this.done = true;
        this.setAddForm();
      },
      (error: HttpErrorResponse) => {
        console.log('Error while fetching users', error);
      }
    );
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
