import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { CustomersService } from "src/customers/customers.service";
import { jwtConstants } from "./constants";

export interface RequestUser {
  userId: number
  email: string
  fullAccess: boolean
  permissions: any[]
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor (
        private readonly customerService: CustomersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.SECRET
        });
    }

    async validate(payload): Promise<any> {
        const user = await this.customerService.findCustomerByEmail(payload.email);

        return { 
            sub: user.id, 
            email: user.email
        };
    }
}