import { IsUUID } from 'class-validator';
import { PartialArtistDto } from './partial-artist.dto';

export class GetArtistQueryDto extends PartialArtistDto {
  @IsUUID(4, { message: 'artistId must be a valid UUID' })
  artistId: string;
}
