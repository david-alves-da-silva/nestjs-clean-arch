import { SigninUseCase } from '@/users/application/usecasses/signin.usecase'

export class SigninDto implements SigninUseCase.Input {
  email: string
  password: string
}
