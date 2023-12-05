import { IsOptional } from 'class-validator';
import { BaseArtistDto } from './base-artist.dto';

export class PartialArtistDto extends BaseArtistDto {
  @IsOptional()
  name: string;

  @IsOptional()
  bio: string;
}
