import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { SongService } from '../song.service';

@Injectable()
export class SongOwnerGuard implements CanActivate {
    constructor(private songService: SongService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const { songId } = request.params;

        if (!songId) {
            return false;
        }

        const songs = await this.songService.getSongs({ id: songId });

        if (songs.totalCount == 0) {
            throw new NotFoundException('Song not found');
        }

        // Assuming currentUser is stored in the request object
        const currentArtist = request.currentArtist;
        if (songs?.songs[0].artist.id !== currentArtist.id) {
            return false;
        }

        request.ownerSong = songs.songs[0];

        return true;
    }
}
