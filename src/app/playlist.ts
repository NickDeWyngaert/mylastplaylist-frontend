import { Song } from './song';

export class Playlist {
  constructor(public userId?: number, public songs?: Song[]) {}
}
