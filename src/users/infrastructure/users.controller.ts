import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
  Put,
} from '@nestjs/common'
import { SignupDto } from './dtos/signup.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { SignupUseCase } from '../application/usecasses/signup.usecase'
import { SigninUseCase } from '../application/usecasses/signin.usecase'
import { UpdateUserUseCase } from '../application/usecasses/update-user.usecase'
import { UpdatePasswordUseCase } from '../application/usecasses/update-password.usecase'
import { DeleteUserUseCase } from '../application/usecasses/delete-user.usecase'
import { GetUserUseCase } from '../application/usecasses/getuser.usecase'
import { ListUsersUseCase } from '../application/usecasses/listusers.usecase'
import { SigninDto } from './dtos/signin.dto'
import { ListUsersDto } from './dtos/list-users.dto'
import { UpdatePasswordDto } from './dtos/update-password.dto'
import { UserOutput } from '../application/dtos/user-output'
import {
  UserCollectionPresenter,
  UserPresenter,
} from './presenters/user.presenter'
import { AuthService } from '@/auth/infrastructure/auth.service'
@Controller('users')
export class UsersController {
  @Inject(SigninUseCase.UseCase)
  private signinUseCase: SigninUseCase.UseCase

  @Inject(SignupUseCase.UseCase)
  private signupUseCase: SignupUseCase.UseCase

  @Inject(ListUsersUseCase.UseCase)
  private listUsersUseCase: ListUsersUseCase.UseCase

  @Inject(GetUserUseCase.UseCase)
  private getUserUseCase: GetUserUseCase.UseCase

  @Inject(UpdateUserUseCase.UseCase)
  private updateUserUseCase: UpdateUserUseCase.UseCase

  @Inject(UpdatePasswordUseCase.UseCase)
  private updatePasswordUseCase: UpdatePasswordUseCase.UseCase

  @Inject(DeleteUserUseCase.UseCase)
  private deleteUserUseCase: DeleteUserUseCase.UseCase

  @Inject(AuthService)
  private authService: AuthService

  static userToResponse(output: UserOutput) {
    return new UserPresenter(output)
  }
  static listUsersToResponse(output: ListUsersUseCase.Output) {
    return new UserCollectionPresenter(output)
  }

  @Post()
  async create(@Body() signupDto: SignupDto) {
    const output = await this.signupUseCase.execute(signupDto)
    return UsersController.userToResponse(output)
  }
  @HttpCode(200)
  @Post('login')
  async login(@Body() signinDto: SigninDto) {
    const output = await this.signinUseCase.execute(signinDto)
    return this.authService.generateJwt(output.id)
  }
  @Get()
  async search(@Query() searchParams: ListUsersDto) {
    const output = await this.listUsersUseCase.execute(searchParams)
    return UsersController.listUsersToResponse(output)
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getUserUseCase.execute({ id })
    return UsersController.userToResponse(output)
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const output = await this.updateUserUseCase.execute({
      id,
      ...updateUserDto,
    })
    return UsersController.userToResponse(output)
  }
  @Patch(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const output = await this.updatePasswordUseCase.execute({
      id,
      ...updatePasswordDto,
    })
    return UsersController.userToResponse(output)
  }
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUserUseCase.execute({ id })
  }
}
