import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ArtistService } from '../artist.service';

@Injectable()
export class ArtistGuard implements CanActivate {
    constructor(private readonly artistService: ArtistService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session;

        if (!userId) {
            return false;
        }

        const [artist] = await this.artistService.getArtist({ userId: userId, name: null, bio: null });

        if (!artist) {
            return false;
        }

        return true;
    }
}