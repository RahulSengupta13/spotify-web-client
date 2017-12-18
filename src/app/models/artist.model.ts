import { Album } from './album.model';
export interface Artist{
    id:string;
    name:String;
    genres:any;
    albums: Album[];
}