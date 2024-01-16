import { UsersController } from '../../users.controller'
import { UserOutput } from '@/users/application/dtos/user-output'
import { SignupUseCase } from '@/users/application/usecasses/signup.usecase'
import { SignupDto } from '../../dtos/signup.dto'
import { SigninUseCase } from '@/users/application/usecasses/signin.usecase'
import { SigninDto } from '../../dtos/signin.dto'
import { UpdateUserUseCase } from '@/users/application/usecasses/update-user.usecase'
import { UpdateUserDto } from '../../dtos/update-user.dto'
import { UpdatePasswordUseCase } from '@/users/application/usecasses/update-password.usecase'
import { UpdatePasswordDto } from '../../dtos/update-password.dto'
import { GetUserUseCase } from '@/users/application/usecasses/getuser.usecase'
import { ListUsersUseCase } from '@/users/application/usecasses/listusers.usecase'

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
  it('should update a user', async () => {
    const output: UpdateUserUseCase.Output = props
    const mockUpdateUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['updateUserUseCase'] = mockUpdateUserUseCase as any
    const input: UpdateUserDto = {
      name: 'new name',
    }
    const result = await sut.update(id, input)
    expect(output).toMatchObject(result)
    expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({ id, ...input })
  })
  it('should update a users password', async () => {
    const output: UpdatePasswordUseCase.Output = props
    const mockUpdatePasswordUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['updatePasswordUseCase'] = mockUpdatePasswordUseCase as any
    const input: UpdatePasswordDto = {
      password: 'new name',
      oldPassword: 'old password',
    }
    const result = await sut.updatePassword(id, input)
    expect(output).toMatchObject(result)
    expect(mockUpdatePasswordUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    })
  })
  it('should delete a user', async () => {
    const output = undefined
    const mockDeleteUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['deleteUserUseCase'] = mockDeleteUserUseCase as any
    const result = await sut.remove(id)
    // expect(output).toStrictEqual(result)
    expect(mockDeleteUserUseCase.execute).toHaveBeenCalledWith({ id })
  })
  it('should gets a user', async () => {
    const output: GetUserUseCase.Output = props
    const mockGetUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['getUserUseCase'] = mockGetUserUseCase as any
    const result = await sut.findOne(id)
    // expect(output).toStrictEqual(result)
    expect(mockGetUserUseCase.execute).toHaveBeenCalledWith({ id })
  })
  it('should list users', async () => {
    const output: ListUsersUseCase.Output = {
      items: [props],
      currentPage: 1,
      lastPage: 1,
      perPage: 1,
      total: 1,
    }
    const mockListUsersUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    }
    sut['listUsersUseCase'] = mockListUsersUseCase as any
    const searchParams = {
      page: 1,
      perPage: 1,
    }
    const result = await sut.search(searchParams)
    expect(output).toStrictEqual(result)
    expect(mockListUsersUseCase.execute).toHaveBeenCalledWith(searchParams)
  })
})
