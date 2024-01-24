import { SigninUseCase } from '@/users/application/usecasses/signin.usecase'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SigninDto implements SigninUseCase.Input {
  @ApiProperty({ description: 'Email do usuario' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string
  @ApiProperty({ description: 'Senha do usuario' })
  @IsString()
  @IsNotEmpty()
  password: string
}
