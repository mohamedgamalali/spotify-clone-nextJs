import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Songs } from './songs.entity';
import { Artist } from '../artist/artist.entity';

@Module({
  controllers: [SongsController],
  providers: [SongsService],
  imports: [TypeOrmModule.forFeature([Songs, Artist])],
})
export class SongsModule {}
