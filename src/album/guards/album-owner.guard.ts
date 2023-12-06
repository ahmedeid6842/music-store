import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { AlbumService } from '../album.service';

@Injectable()
export class AlbumOwnerGuard implements CanActivate {
    constructor(private albumService: AlbumService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        let albumId;
        if (request.params.albumId) {
            albumId = request.params.albumId
        } else if (request.body.albumId) {
            albumId = request.body.albumId
        } else {
            return false;
        }

        if (!albumId) {
            return false;
        }

        const albums = await this.albumService.getAlbums({ id: albumId });

        if (albums.totalCount == 0) {
            throw new NotFoundException('Album not found');
        }

        // Assuming currentUser is stored in the request object
        const currentArtist = request.currentArtist;

        if(!currentArtist){
            return false;
        }
        
        if (albums?.albums[0].artists[0].id !== currentArtist.id) {
            return false;
        }

        request.ownerAlbum = albums.albums[0];

        return true;
    }
}
