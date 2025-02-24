import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => Number(value ?? 1))
  @IsNumber(
    { allowNaN: true, allowInfinity: false },
    { message: 'Page must be a number' },
  )
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value ?? DEFAULT_PAGE_SIZE))
  @IsNumber(
    { allowNaN: true, allowInfinity: false },
    { message: 'Limit must be a number' },
  )
  @Min(1)
  limit: number = DEFAULT_PAGE_SIZE;
}
