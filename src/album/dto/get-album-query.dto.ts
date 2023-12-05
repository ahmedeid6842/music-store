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
    page?: number;

    @IsNumber()
    @IsInt()
    @IsOptional()
    @Min(1)
    limit?: number;

    @IsString()
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    sort?: 'ASC' | 'DESC';
}
