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

  @Post()
  async create(@Body() signupDto: SignupDto) {
    return this.signupUseCase.execute(signupDto)
  }
  @HttpCode(200)
  @Post('login')
  async login(@Body() signinDto: SigninDto) {
    return this.signinUseCase.execute(signinDto)
  }
  @Get()
  async search(@Query() searchParams: ListUsersDto) {
    return this.listUsersUseCase.execute(searchParams)
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getUserUseCase.execute({ id })
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute({ id, ...updateUserDto })
  }
  @Patch(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.updatePasswordUseCase.execute({ id, ...updatePasswordDto })
  }
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUserUseCase.execute({ id })
  }
}
