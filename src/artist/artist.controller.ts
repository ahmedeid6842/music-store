import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserDto } from 'src/auth/dto/user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { GetArtistQueryDto } from './dto/get-artist-query.dto';

@Serialize(UserDto)
@Controller('artist')
export class ArtistController {
    constructor(private artistService: ArtistService) { }

    @UseGuards(AuthGuard)
    @Post("/")
    async createArtist(@Body() body: CreateArtistDto, @CurrentUser() user: UserDto) {
        return await this.artistService.createArtist(body, user);
    }

    @Get("/")
    async getArtist(@Query() query: GetArtistQueryDto) {
        return await this.artistService.getArtist(query);
    }
}
