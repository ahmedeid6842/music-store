import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AlbumService } from '../album.service';

@Injectable()
export class AlbumOwnerGuard implements CanActivate {
    constructor(private albumService: AlbumService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { albumId } = request.params;

        if (!albumId) {
            return false;
        }

        const albums = await this.albumService.getAlbums({ id: albumId });

        if (albums.totalCount == 0) {
            return false;
        }

        // Assuming currentUser is stored in the request object
        const currentArtist = request.currentArtist;
        if (albums?.albums[0].artists[0].id !== currentArtist.id) {
            return false;
        }

        request.ownerAlbum = albums.albums[0];

        return true;
    }
}
