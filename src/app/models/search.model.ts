import { Album } from './album.model';
import { Artist } from './artist.model';
import { Track } from './track.model';
export interface Search{
    albums:Album[];
    artists:Artist[];
    tracks:Track[];
}