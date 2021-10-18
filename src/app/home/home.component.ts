import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private service: PlaylistService) {}

  ngOnInit(): void {
    this.setUsers();
  }

  private setUsers(): void {
    this.service.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.done = true;
      },
      (error: HttpErrorResponse) => {
        console.log('Error while fetching users', error);
      }
    );
  }
}
