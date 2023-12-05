import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";
import { PartialAlbumDto } from "./partial-album.dto";

export class GetAlbumQueryDto extends PartialAlbumDto {
    @IsUUID('4')
    @IsOptional()
    id?: string;

    @IsNumber()
    @IsInt()
    @IsOptional()
    @Min(1)
    page?: number = 1;

    @IsNumber()
    @IsInt()
    @IsOptional()
    @Min(1)
    limit?: number = 10;

    @IsString()
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sortOrder?: 'ASC' | 'DESC';

    @IsString()
    @IsOptional()
    sortField?: string;
}
