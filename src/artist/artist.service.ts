import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';
import { ArtistDto } from './dto/create-artist.dto';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { GetArtistDto } from './dto/get-artist.dto';
import { JwtPayload } from '../users/constants';

@Injectable()
export class ArtistService {
  @InjectRepository(Artist)
  private readonly artistRepository: Repository<Artist>;

  async create(artistDto: ArtistDto, user: JwtPayload): Promise<Artist> {
    const artist = this.artistRepository.create({
      ...artistDto,
      user: { id: user.id },
    });
    return this.artistRepository.save(artist);
  }

  async getSingleArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async getArtistByUserId(userId: string): Promise<Artist | null> {
    const artist = await this.artistRepository.findOne({
      where: { user: { id: userId } },
    });
    return artist;
  }

  async getArtists(options: PaginationDto & GetArtistDto): Promise<{
    items: Artist[];
    total: number;
    page: number;
    lastPage: number;
  }> {
    const { page, limit } = options;
    const [items, total] = await this.artistRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: { user: true },
      select: {
        id: true,
        name: true,
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return {
      items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
