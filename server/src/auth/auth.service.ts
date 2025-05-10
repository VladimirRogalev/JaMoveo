import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {RegisterDto} from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import {LoginDto} from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
                private readonly jwtService: JwtService) {}

    async register(dto: RegisterDto) {
        const passwordHash = await bcrypt.hash(dto.password, 10);

        return this.usersService.create({
            username: dto.username,
            passwordHash,
            instrument: dto.instrument,
            role: 'player',
        });
    }


    async registerAdmin(dto: RegisterDto) {
        const passwordHash = await bcrypt.hash(dto.password, 10);

        return this.usersService.create({
            username: dto.username,
            passwordHash,
            instrument: dto.instrument,
            role: 'admin',
        });
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findByUsername(dto.username);
        if (!user) throw new UnauthorizedException('User not found');

        const passwordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordValid) throw new UnauthorizedException('Invalid password');

        const payload = { sub: user.id, username: user.username, role: user.role};
        return {
            access_token: this.jwtService.sign(payload)
        };

    }
}
