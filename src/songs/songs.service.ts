import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Songs } from './songs.entity';
import { In, Repository } from 'typeorm';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { Artist } from '../artist/artist.entity';

@Injectable()
export class SongsService {
  @InjectRepository(Songs)
  private readonly songsRepository: Repository<Songs>;

  @InjectRepository(Artist)
  private readonly artistRepository: Repository<Artist>;

  async getSongs(pagination: PaginationDto): Promise<{
    items: Songs[];
    total: number;
    page: number;
    lastPage: number;
  }> {
    const { page, limit } = pagination;
    const [items, total] = await this.songsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: { artists: true },
    });

    return {
      items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
  async createSong(song: CreateSongDto): Promise<Songs> {
    const artists = await this.artistRepository.find({
      where: { id: In(song.artists) },
    });
    if (artists.length !== song.artists.length) {
      throw new BadRequestException('Artist not found');
    }
    const newSong = this.songsRepository.create({
      ...song,
      artists,
    });
    return this.songsRepository.save(newSong);
  }
  async getSingleSong(id: string): Promise<Songs> {
    const song = await this.songsRepository.findOne({ where: { id } });
    if (!song) {
      throw new NotFoundException('Song not found');
    }
    return song;
  }
}
