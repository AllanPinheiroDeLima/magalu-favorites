import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";
import { CustomerJWTObject } from "../auth.service";

@Injectable()
export class CanManage implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as CustomerJWTObject;

    if (Number(request.params.id) === Number(user.sub)) {
      return true
    }

    throw new ForbiddenException("Not authorized to manage")
  }
}