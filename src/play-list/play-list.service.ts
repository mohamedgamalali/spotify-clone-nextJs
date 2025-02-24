import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayList } from './play-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Songs } from '../songs/songs.entity';
import { Users } from '../users/users.entity';
import { CreatePlayListDto } from './dto/create-playlist.dto';

@Injectable()
export class PlayListService {
  @InjectRepository(PlayList)
  private readonly playListRepository: Repository<PlayList>;

  @InjectRepository(Songs)
  private readonly songsRepository: Repository<Songs>;

  @InjectRepository(Users)
  private readonly usersRepository: Repository<Users>;

  async create(playList: CreatePlayListDto): Promise<PlayList> {
    const user = await this.usersRepository.findOne({
      where: { id: playList.user },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const songs = await this.songsRepository.find({
      where: { id: In(playList.songs) },
    });

    if (songs.length !== playList.songs.length) {
      throw new NotFoundException('Some songs not found');
    }

    const newPlayList = this.playListRepository.create({
      name: playList.name,
      songs,
      user,
    });

    return this.playListRepository.save(newPlayList);
  }

  async getPlayList(id: string): Promise<PlayList> {
    const playList = await this.playListRepository.findOne({
      where: { id },
      relations: { songs: true, user: true },
      select: {
        songs: { id: true, title: true, duration: true },
        user: { id: true, name: true },
      },
    });

    if (!playList) {
      throw new NotFoundException('PlayList not found');
    }

    return playList;
  }

  async getAllPlayLists(): Promise<PlayList[]> {
    return this.playListRepository.find();
  }
}
