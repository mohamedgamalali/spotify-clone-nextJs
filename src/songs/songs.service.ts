import { Injectable } from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song.dto';
@Injectable()
export class SongsService {
  private songs: CreateSongDTO[] = [
    {
      title: 'song1',
      duration: '1:2',
      artists: ['artist1', 'artist2'],
      releaseDate: new Date('2024-01-01'),
    },
    {
      title: 'song2',
      duration: '2:2',
      artists: ['artist3', 'artist4'],
      releaseDate: new Date('2024-01-01'),
    },
    {
      title: 'song3',
      duration: '3:2',
      artists: ['artist5', 'artist6'],
      releaseDate: new Date('2024-01-01'),
    },
  ];
  getSongs(): CreateSongDTO[] {
    return this.songs;
  }
  createSong(song: CreateSongDTO): CreateSongDTO[] {
    this.songs.push(song);
    return this.songs;
  }
  getSingleSong(index: number): CreateSongDTO {
    return this.songs[index];
  }
}
