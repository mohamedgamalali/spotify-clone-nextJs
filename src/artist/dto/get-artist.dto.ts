import { IsOptional, IsString } from 'class-validator';

export class GetArtistDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;
}
