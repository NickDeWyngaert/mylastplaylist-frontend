import { Song } from "./song";

export class Playlist {

constructor(
    public userid?: number,
    public songs?: Song[]
) {}

}