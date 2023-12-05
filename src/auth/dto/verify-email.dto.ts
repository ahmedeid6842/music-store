import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyEmailDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    verificationCode: string;
}
