import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm';
import { Songs } from '../songs/songs.entity';
import { Users } from '../users/users.entity';

@Entity()
export class PlayList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @OneToMany(() => Songs, (song) => song.playList)
  songs: Songs[];

  @ManyToOne(() => Users, (user) => user.playlists)
  user: Users;
}
