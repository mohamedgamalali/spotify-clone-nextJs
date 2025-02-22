import {
  IsString,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsMilitaryTime,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @IsMilitaryTime()
  @IsNotEmpty({ message: 'Duration is required' })
  readonly duration: string;

  @IsArray()
  @IsNotEmpty({ message: 'Artists are required' })
  readonly artists: string[];

  @IsDateString()
  @IsNotEmpty({ message: 'Release date is required' })
  readonly releaseDate: Date;
}
