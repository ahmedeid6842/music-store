import { Request } from "express";
import { BaseGuard } from "./base.guard";
import { ForbiddenException } from "@nestjs/common";

export class AuthGuard extends BaseGuard {

  canActivateInternal(request: Request) {
    console.log(request.session)
    if (!request.session.userId) {
      return false;
    }

    if (!request.currentUser.isVerified) {
      throw new ForbiddenException("User is not verified. Please verify your account.");
    }

    return true;
  }

}