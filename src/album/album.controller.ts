import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ArtistGuard } from 'src/artist/guards/artist.guard';
import { CreateAlbumDto } from './dto/create-album.dto';
import { CurrentArtist } from 'src/artist/decorators/current-artist.decorator';
import { Artist } from 'src/artist/artist.entity';
import { GetAlbumQueryDto } from './dto/get-album-query.dto';
import { PartialAlbumDto } from './dto/partial-album.dto';
import { AlbumOwnerGuard } from './guards/album-owner.guard';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) { }

    @Post()
    @UseGuards(AuthGuard)
    @UseGuards(ArtistGuard)
    async createAlbum(@Body() body: CreateAlbumDto, @CurrentArtist() artist: Artist) {
        return await this.albumService.createAlbum(body, artist);
    }

    @Get()
    async getAlbums(@Query() query: GetAlbumQueryDto) {
        return await this.albumService.getAlbums(query);
    }

    @Patch("/:albumId")
    @UseGuards(AuthGuard)
    @UseGuards(ArtistGuard)
    @UseGuards(AlbumOwnerGuard)
    async updateAlbum(@Param("albumId") albumId: string, @Body() body: PartialAlbumDto) {
        return await this.albumService.updateAlbum(albumId, body);
    }
}
