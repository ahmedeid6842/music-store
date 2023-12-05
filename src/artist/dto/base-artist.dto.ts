import { IsString, Length } from 'class-validator';

export class BaseArtistDto {
  @IsString({ message: 'Name must be a string' })
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  name: string;

  @IsString({ message: 'Bio must be a string' })
  @Length(10, 500, { message: 'Bio must be between 10 and 500 characters' })
  bio: string;
}
