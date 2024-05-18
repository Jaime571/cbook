import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('post')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2097152 })],
      }),
    )
    file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto, file);
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

  @Patch('patchImage/:codigo')
  @UseInterceptors(FileInterceptor('file'))
  updateImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2097152 })],
      }),
    )
    file: Express.Multer.File,
    @Param('codigo') codigo: string,
  ) {
    return this.usersService.updateImage(codigo, file);
  }

  @Delete('delete/:codigo')
  remove(@Param('codigo') codigo: string) {
    return this.usersService.remove(codigo);
  }
}
