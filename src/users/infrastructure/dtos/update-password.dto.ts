import { UpdatePasswordUseCase } from '@/users/application/usecasses/update-password.usecase'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdatePasswordDto
  implements Omit<UpdatePasswordUseCase.Input, 'id'>
{
  @ApiProperty({ description: 'Nova senha do usuárioo' })
  @IsString()
  @IsNotEmpty()
  password: string
  @ApiProperty({ description: 'Senha atual do usuário' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string
}
