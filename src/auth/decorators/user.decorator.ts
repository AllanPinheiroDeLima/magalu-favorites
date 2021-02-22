import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CustomerJWTObject } from "../auth.service";

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): CustomerJWTObject => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as CustomerJWTObject;
    }
)