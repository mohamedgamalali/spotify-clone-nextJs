import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserSignupDTO } from './dto/user-signup-dto';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { UserSigninDTO } from './dto/user-signin.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async signup(user: UserSignupDTO) {
    const { email, password, name } = user;
    const existedUser = await this.usersRepository.findBy({
      email,
    });
    if (existedUser.length) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword: string = await hash(password, 10);

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
      name,
    });
    return this.usersRepository.save(newUser);
  }
  async signin(user: UserSigninDTO) {
    const { email, password } = user;
    const existedUser = await this.usersRepository.findBy({
      email,
    });
    if (!existedUser.length) {
      throw new NotFoundException('User not found');
    }
    const userFetched = existedUser[0];
    const isPasswordValid = await compare(password, userFetched.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return userFetched;
  }
}
