import { UsersController } from '../../users.controller'
import { UserOutput } from '@/users/application/dtos/user-output'
import { SignupUseCase } from '@/users/application/usecasses/signup.usecase'
import { SignupDto } from '../../dtos/signup.dto'
import { SigninUseCase } from '@/users/application/usecasses/signin.usecase'
import { SigninDto } from '../../dtos/signin.dto'

describe('UsersController unit tests', () => {
  let sut: UsersController
  let id: string
  let props: UserOutput

  beforeEach(async () => {
    sut = new UsersController()
    id = '70b5a6b7-1bf7-471c-9e9d-0587e7699b14'
    props = {
      id,
      name: 'Jorge Test',
      email: 'b@b.com',
      password: '1234',
      createdAt: new Date(),
    }
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
  it('should create a user', async () => {
    const output: SignupUseCase.Output = props
    const mockSigupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['signupUseCase'] = mockSigupUseCase as any
    const input: SignupDto = {
      name: 'Jorge Test',
      email: 'b@b.com',
      password: '1234',
    }
    const result = await sut.create(input)
    expect(output).toMatchObject(result)
    expect(mockSigupUseCase.execute).toHaveBeenCalledWith(input)
  })
  it('should authenticate a user', async () => {
    const output: SigninUseCase.Output = props
    const mockSiginUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['signinUseCase'] = mockSiginUseCase as any
    const input: SigninDto = {
      email: 'b@b.com',
      password: '1234',
    }
    const result = await sut.login(input)
    expect(output).toMatchObject(result)
    expect(mockSiginUseCase.execute).toHaveBeenCalledWith(input)
  })
})
