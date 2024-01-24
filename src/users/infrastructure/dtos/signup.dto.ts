import { SignupUseCase } from '@/users/application/usecasses/signup.usecase'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignupDto implements SignupUseCase.Input {
  @ApiProperty({ description: 'Nome do usuario' })
  @IsString()
  @IsNotEmpty()
  name: string
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
