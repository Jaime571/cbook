import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('post')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('get')
  findOne(@Param('codigo') codigo: string) {
    return this.usersService.findOne(codigo);
  }

  @Patch('patch')
  update(
    @Param('codigo') codigo: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(codigo, updateUserDto);
  }

  @Delete('delete')
  remove(@Param('codigo') codigo: string) {
    return this.usersService.remove(codigo);
  }
}
