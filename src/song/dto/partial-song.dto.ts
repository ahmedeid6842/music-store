import { IsInt, IsOptional, IsString, Length, Min } from "class-validator";

export class PartialSongDto {
    @IsString()
    @IsOptional()
    @Length(1, 255)
    title?: string;

    @IsInt()
    @IsOptional()
    @Min(1)
    duration?: number
}
