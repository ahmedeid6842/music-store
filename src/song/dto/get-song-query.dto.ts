import { IsIn, IsInt, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";
import { Transform } from "class-transformer";
import { PartialSongDto } from "./partial-song.dto";

export class GetSongQueryDto extends PartialSongDto {
    @IsUUID('4')
    @IsOptional()
    id?: string;

    @IsUUID('4')
    @IsOptional()
    albumId?: string;

    @IsUUID('4')
    @IsOptional()
    artistId?: string;

    @IsNumber()
    @IsInt()
    @IsOptional()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    page?: number = 1;

    @IsNumber()
    @IsInt()
    @IsOptional()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    limit?: number = 10;

    @IsString()
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sortOrder?: 'ASC' | 'DESC';

    @IsString()
    @IsOptional()
    sortField?: string;
}
