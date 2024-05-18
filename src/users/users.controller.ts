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
import { User } from './entities';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('post')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('get/:codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.usersService.findOne(codigo);
  }

  @Get('libros/:codigo')
  getUserBooks(@Param('codigo') codigo: string) {
    return this.usersService.getUserBooks(codigo);
  }

  @Patch('patch/:codigo')
  update(
    @Param('codigo') codigo: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(codigo, updateUserDto);
  }

  @Delete('delete/:codigo')
  remove(@Param('codigo') codigo: string) {
    return this.usersService.remove(codigo);
  }
}
