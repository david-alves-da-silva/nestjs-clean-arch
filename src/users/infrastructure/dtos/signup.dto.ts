import { SignupUseCase } from '@/users/application/usecasses/signup.usecase'

export class SignupDto implements SignupUseCase.Input {
  name: string
  email: string
  password: string
}
