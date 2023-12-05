import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserDto } from 'src/auth/dto/user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Serialize(UserDto)
@Controller('artist')
export class ArtistController {
    constructor(private artistService: ArtistService) { }

    @UseGuards(AuthGuard)
    @Post("/")
    async createArtist(@Body() body: CreateArtistDto, @CurrentUser() user: UserDto) {
        return this.artistService.createArtist(body, user);
    }
}
