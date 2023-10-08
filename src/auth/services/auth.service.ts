import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService
    ){}
    public async validateUser(username: string, password:string){
        const userByUserName = await this.userService.findBy({
            key: 'username',
            value: username
        });
        const userByUserEmail = await this.userService.findBy({
            key: 'email',
            value: username
        });

        if(userByUserName){
            const match = await bcrypt.compare(password, userByUserName.password)
            if(match) return userByUserName;
        }

        if(userByUserEmail){
            const match = await bcrypt.compare(password, userByUserEmail.password)
            if(match) return userByUserEmail;
        }

        return null;

    }

    public signJWT({payload, secret, expires}:{
        payload: jwt.JwtPayload;
        secret: string;
        expires: number | string;
    }){
        return jwt.sign(payload, secret, {expiresIn: expires});
    }

    public async generateJWT(user: UsersEntity):Promise<any>{
        const getUser= await this.userService.findUsersById(user.id)

        const payload : PayloadToken= {
            role: getUser.role,
            sub: getUser.id
        }

        return {
            accessToke: this.signJWT({
                payload,
                secret: process.env.JWT_SECRET,
                expires: '1hr'
            }),
            user
        }
    }
}
