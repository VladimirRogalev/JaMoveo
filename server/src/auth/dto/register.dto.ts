import {IsIn, IsNotEmpty, IsString} from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    instrument: string;

    @IsIn(['admin', 'player'])
    role:'admin'|'player' ;
}