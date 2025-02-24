import { PlayList } from '../play-list/play-list.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Songs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  title: string;

  @Column('text', { array: true, nullable: false })
  artists: string[];

  @Column('text', { nullable: false })
  album: string;

  @Column('text')
  genre: string;

  @Column('text', { nullable: true })
  lyrics: string;

  @Column('text', { nullable: false })
  duration: string;

  @ManyToOne(() => PlayList, (playList) => playList.songs)
  playList: PlayList;
}
