import {
  IsArray,
  IsNotEmpty,
  IsMilitaryTime,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
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
