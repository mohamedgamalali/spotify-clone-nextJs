import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Users } from '../users/users.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TypeOrmModule.forFeature([Artist, Users])],
})
export class ArtistModule {}
