import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PlayListService } from './play-list.service';
import { CreatePlayListDto } from './dto/create-playlist.dto';

@Controller({ path: 'play-list' })
export class PlayListController {
  constructor(private readonly playListService: PlayListService) {}

  @Post()
  create(@Body() playList: CreatePlayListDto) {
    return this.playListService.create(playList);
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
