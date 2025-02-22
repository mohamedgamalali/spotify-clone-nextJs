import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';

@Controller({ path: 'songs' })
export class SongsController {
  @Inject(SongsService)
  private readonly songsService: SongsService;
  @Get()
  getSongs(): CreateSongDTO[] {
    return this.songsService.getSongs();
  }
  @Post()
  createSong(@Body() song: CreateSongDTO): CreateSongDTO[] {
    return this.songsService.createSong(song);
  }
  @Get(':id')
  getSingleSong(@Param('id', ParseIntPipe) id: number): CreateSongDTO {
    return this.songsService.getSingleSong(id);
  }
}
