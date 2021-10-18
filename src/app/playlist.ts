import { Song } from './song';
import { User } from './user';

export class Playlist {
  constructor(public user: User, public songs?: Song[]) {}
}
