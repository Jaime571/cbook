import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(user: CreateUserDto): CreateUserDto {
    const newRecord = this.userRepository.create(user);
    this.userRepository.save(newRecord);
    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(codigo: string): Promise<User> {
    let user: User;
    try {
      user = await this.userRepository.findOne({ where: { codigo } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Server failed to search for the user',
      );
    }
    if (!user) {
      throw new NotFoundException('User not found in database');
    }
    return user;
  }

  async update(codigo: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException('No values sent to modify');
    }

    let user: User;
    try {
      user = await this.userRepository.findOne({
        where: { codigo },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Server failed to search for the user',
      );
    }

    if (!user) {
      throw new NotFoundException('User not found in database');
    }
    Object.assign(user, updateUserDto);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Server failed to update the user',
      );
    }
    return user;
  }

  async remove(codigo: string): Promise<User> {
    let user: User;
    try {
      user = await this.userRepository.findOne({ where: { codigo } });
    } catch (error) {
      throw new InternalServerErrorException('Server failed to delete user');
    }
    if (!user) {
      throw new NotFoundException('User not found in database');
    }
    this.userRepository.remove(user);
    return user;
  }

  async getUserBooks(codigo: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { codigo },
        relations: {
          libros: true,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found in database');
      }
      return user;
    } catch (err) {
      throw new InternalServerErrorException(
        'Server failed to get user with books',
      );
    }
  }
}
