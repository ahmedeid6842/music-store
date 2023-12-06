import { IsIn, IsInt, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";
import { Transform } from "class-transformer";

export class GetSongQueryDto {
    @IsUUID('4')
    @IsOptional()
    id?: string;

    @IsUUID('4')
    @IsOptional()
    albumId?: string;

    @IsUUID('4')
    @IsOptional()
    artistId?: string;

    @IsString()
    @IsOptional()
    @Length(1, 255)
    title?: string;

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
