import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists/playlists.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'playlists',
    pathMatch: 'full',
  },
  {
    path: 'playlists',
    component: PlaylistsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
