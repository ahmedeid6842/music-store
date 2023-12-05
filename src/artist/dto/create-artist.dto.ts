import { IsNotEmpty } from 'class-validator';
import { BaseArtistDto } from './base-artist.dto';

export class CreateArtistDto extends BaseArtistDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Bio is required' })
  bio: string;
}
