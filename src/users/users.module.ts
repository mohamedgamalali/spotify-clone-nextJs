import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constants';
import { JwtStrategy } from './jwt-strategy';
import { ArtistService } from '../artist/artist.service';
import { Artist } from 'src/artist/artist.entity';

@Module({
  providers: [UsersService, JwtStrategy, ArtistService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([Users, Artist]),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class UsersModule {}
