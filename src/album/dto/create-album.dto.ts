import { IsNotEmpty, IsString, Length } from "class-validator";
import { Not } from "typeorm";

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty({ message: 'title is required' })
    @Length(1, 100, { message: 'title must be between 1 and 100 characters' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'artworkUrl is required' })
    artworkUrl: string;
}
