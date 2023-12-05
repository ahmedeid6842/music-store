import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { Not } from "typeorm";

export class PartialAlbumDto {
    @IsString()
    @IsOptional()
    @Length(1, 100, { message: 'title must be between 1 and 100 characters' })
    title?: string;

    @IsString()
    @IsOptional()
    artworkUrl?: string;
}
