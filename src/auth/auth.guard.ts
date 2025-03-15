import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from "express";
import { DatabaseService } from 'src/config/database/database.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly dbs: DatabaseService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Obtener el payload del token sin verificar la firma
      const payload: any = this.jwtService.decode(token);
      const email = payload.email;

      // Consultar la base de datos para obtener el secretWord del usuario
      const query = `
        FOR user IN users
        FILTER user.email == @value
        RETURN { secretWord: user.secretWord }
      `;
      const result = await this.dbs.executeAQL(query, { value: email });

      if (result.length === 0) {
        throw new UnauthorizedException('User not found');
      }

      const secretWord = result[0].secretWord;

      // Verificar el token utilizando el secretWord
      await this.jwtService.verifyAsync(token, { secret: secretWord });

      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
