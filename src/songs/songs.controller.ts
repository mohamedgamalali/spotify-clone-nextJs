import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Songs } from './songs.entity';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { ArtistJwtGuard } from 'src/users/atrist-jwt.guard';
import { JwtPayload } from 'src/users/constants';

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
  @UseGuards(ArtistJwtGuard)
  createSong(
    @Body() song: CreateSongDto,
    @Request() req: Request & { user: JwtPayload & { artistId: string } },
  ): Promise<Songs> {
    console.log('createSong artistId', req.user.artistId);
    return this.songsService.createSong(song);
  }

  @Get(':id')
  getSingleSong(@Param('id', ParseUUIDPipe) id: string): Promise<Songs> {
    return this.songsService.getSingleSong(id);
  }
}
