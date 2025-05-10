import {Injectable, NotFoundException} from '@nestjs/common';
import {User} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) {
    }

    async create(data: Partial<User>): Promise<User> {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.repo.findOne({where: {username}});
        if (!user) {
            throw new NotFoundException(`User]found`);
        }
        return user;
    }
}
