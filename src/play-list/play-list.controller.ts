import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PlayListService } from './play-list.service';
import { CreatePlayListDto } from './dto/create-playlist.dto';
import { JwtAuthGuard } from '../users/jwt.guard';
import { JwtPayload } from '../users/constants';

@Controller({ path: 'play-list' })
export class PlayListController {
  constructor(private readonly playListService: PlayListService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() playList: CreatePlayListDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.playListService.create(playList, req);
  }

  @Get()
  getAll() {
    return this.playListService.getAllPlayLists();
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.playListService.getPlayList(id);
  }
}
