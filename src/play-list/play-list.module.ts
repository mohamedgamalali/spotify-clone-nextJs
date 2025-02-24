import { Module } from '@nestjs/common';
import { PlayListController } from './play-list.controller';
import { PlayListService } from './play-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayList } from './play-list.entity';
import { Songs } from '../songs/songs.entity';
import { Users } from '../users/users.entity';

@Module({
  controllers: [PlayListController],
  providers: [PlayListService],
  imports: [TypeOrmModule.forFeature([PlayList, Songs, Users])],
})
export class PlayListModule {}
