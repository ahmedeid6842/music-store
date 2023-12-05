import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ArtistService } from '../artist.service';
import { Artist } from '../artist.entity';

declare global {
    namespace Express {
        interface Request {
            currentArtist?: Artist;
        }
    }
}

@Injectable()
export class CurrentArtistMiddleware implements NestMiddleware {
    constructor(private artistService: ArtistService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};

        if (userId) {
            const [artist] = await this.artistService.getArtist({ userId, name: null, bio: null });
            req.currentArtist = artist;
        }

        next();
    }
}