import {
  IsArray,
  IsNotEmpty,
  IsMilitaryTime,
  IsOptional,
  IsString,
} from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { Songs } from '../songs.entity';

export class CreateSongDto extends OmitType(Songs, ['id']) {
  @IsNotEmpty()
  @IsArray()
  artists: string[];

  @IsMilitaryTime()
  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  album: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsOptional()
  @IsString()
  lyrics: string;
}
