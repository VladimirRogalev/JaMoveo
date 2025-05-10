import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

export type Role = 'admin' | 'player';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    passwordHash: string;

    @Column()
    instrument: string;

    @Column()
    role: Role;
}

