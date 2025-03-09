export const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';

export type JwtPayload = {
  id: string;
  email: string;
  artistId?: string;
};
