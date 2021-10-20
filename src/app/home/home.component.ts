import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddplaylistComponent } from '../dialog-addplaylist/dialog-addplaylist.component';
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

  constructor(private service: PlaylistService, public dialog: MatDialog) {}

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
    let addplaylistDialog = this.dialog.open(DialogAddplaylistComponent);
    addplaylistDialog.afterClosed().subscribe((_) => {
      this.setUsers();
    });
  }
}
