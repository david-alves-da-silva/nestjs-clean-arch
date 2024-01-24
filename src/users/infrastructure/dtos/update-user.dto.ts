import { UpdateUserUseCase } from '@/users/application/usecasses/update-user.usecase'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDto implements Omit<UpdateUserUseCase.Input, 'id'> {
  @ApiProperty({ description: 'Nome do usuario' })
  @IsString()
  @IsNotEmpty()
  name: string
}
