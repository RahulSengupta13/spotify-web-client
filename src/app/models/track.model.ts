import { Album } from './album.model';
import { Artist } from './artist.model';
export interface Track{
    name:string;
    album:Album;
    artists:Artist[];
    preview_url:string;
    id:string;
}