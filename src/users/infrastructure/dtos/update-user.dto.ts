import { UpdateUserUseCase } from '@/users/application/usecasses/update-user.usecase'

export class UpdateUserDto implements Omit<UpdateUserUseCase.Input, 'id'> {
  name: string
}
