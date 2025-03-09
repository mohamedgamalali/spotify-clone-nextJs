import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/create-artist.dto';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { GetArtistDto } from './dto/get-artist.dto';
import { JwtAuthGuard } from '../users/jwt.guard';
import { JwtPayload } from '../users/constants';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() artistDto: ArtistDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.artistService.create(artistDto, req.user);
  }

  @Get()
  getArtists(@Query() options: PaginationDto & GetArtistDto) {
    return this.artistService.getArtists(options);
  }
}
