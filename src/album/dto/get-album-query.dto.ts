import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";
import { PartialAlbumDto } from "./partial-album.dto";
import { Transform } from "class-transformer";

export class GetAlbumQueryDto extends PartialAlbumDto {
    @IsUUID('4')
    @IsOptional()
    id?: string;

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
