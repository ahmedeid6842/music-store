import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SongService } from './song.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ArtistGuard } from 'src/artist/guards/artist.guard';
import { CreateSongDto } from './dto/create-song.dto';
import { CurrentArtist } from 'src/artist/decorators/current-artist.decorator';
import { Artist } from 'src/artist/artist.entity';
import { GetSongQueryDto } from './dto/get-song-query.dto';
import { AlbumOwnerGuard } from 'src/album/guards/album-owner.guard';

@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService) { }

    @UseGuards(AuthGuard)
    @UseGuards(ArtistGuard)
    @UseGuards(AlbumOwnerGuard)
    @Post()
    async createSong(@Body() body: CreateSongDto, @CurrentArtist() artist: Artist) {
        return await this.songService.createSong(body, artist);
    }

    @Get("/")
    async getSongs(@Query() query: GetSongQueryDto) {
        return await this.songService.getSongs(query);
    }
}
