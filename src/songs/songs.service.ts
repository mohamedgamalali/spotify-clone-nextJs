import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Songs } from './songs.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/pagination/pagination.dto';

@Injectable()
export class SongsService {
  @InjectRepository(Songs)
  private readonly songsRepository: Repository<Songs>;

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
    });

    return {
      items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
  async createSong(song: CreateSongDto): Promise<Songs> {
    const newSong = this.songsRepository.create(song);
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
