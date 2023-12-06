import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentArtist = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.currentArtist;
    }
)