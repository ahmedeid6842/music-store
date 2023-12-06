import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  duration: number;

  @IsUUID()
  @IsNotEmpty()
  albumId: string;
}