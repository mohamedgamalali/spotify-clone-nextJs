import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Songs } from './songs.entity';
import { PaginationDto } from '../common/pagination/pagination.dto';

@Controller({ path: 'songs' })
export class SongsController {
  @Inject(SongsService)
  private readonly songsService: SongsService;

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getSongs(@Query() pagination: PaginationDto) {
    return this.songsService.getSongs(pagination);
  }

  @Post()
  createSong(@Body() song: CreateSongDto): Promise<Songs> {
    return this.songsService.createSong(song);
  }

  @Get(':id')
  getSingleSong(@Param('id', ParseUUIDPipe) id: string): Promise<Songs> {
    return this.songsService.getSingleSong(id);
  }
}
