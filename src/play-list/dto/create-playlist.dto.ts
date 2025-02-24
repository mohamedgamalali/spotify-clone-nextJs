import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePlayListDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  songs: string[];

  @IsNotEmpty()
  @IsUUID('4')
  user: string;

  @IsOptional()
  @IsString()
  description: string;
}
