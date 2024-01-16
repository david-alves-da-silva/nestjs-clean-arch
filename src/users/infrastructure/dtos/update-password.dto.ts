import { UpdatePasswordUseCase } from '@/users/application/usecasses/update-password.usecase'

export class UpdatePasswordDto
  implements Omit<UpdatePasswordUseCase.Input, 'id'>
{
  password: string
  oldPassword: string
}
