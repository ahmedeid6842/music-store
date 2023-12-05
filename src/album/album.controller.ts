import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ArtistGuard } from 'src/artist/guards/artist.guard';
import { CreateAlbumDto } from './dto/create-album.dto';
import { CurrentArtist } from 'src/artist/decorators/current-artist.decorator';
import { Artist } from 'src/artist/artist.entity';

@Controller('album')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) { }

    @Post()
    @UseGuards(AuthGuard)
    @UseGuards(ArtistGuard)
    async createAlbum(@Body() body: CreateAlbumDto, @CurrentArtist() artist: Artist) {
        
        return await this.albumService.createAlbum(body, artist);
    }
}
