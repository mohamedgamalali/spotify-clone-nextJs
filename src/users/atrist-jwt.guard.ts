import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JwtPayload } from './constants';

@Injectable()
export class ArtistJwtGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
  handleRequest<TUser = any>(err: any, user: JwtPayload): TUser {
    if (!user || err) {
      throw new UnauthorizedException();
    }
    if (user.artistId) {
      return user as TUser;
    }
    throw new UnauthorizedException('User is not an artist');
  }
}
