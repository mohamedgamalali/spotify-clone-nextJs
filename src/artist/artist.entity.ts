import { Users } from '../users/users.entity';
import { Songs } from '../songs/songs.entity';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @ManyToMany(() => Songs, (song) => song.artists)
  songs: Songs[];

  @OneToOne(() => Users, (user) => user.artist)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
