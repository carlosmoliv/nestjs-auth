import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from '../enums/auth-type';
import { SessionAuthenticationService } from './session-authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { promisify } from 'util';
import { Request } from 'express';
import { ActiveUser } from '../decorators/active-user.decorator';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { SessionGuard } from './guards/session/session.guard';

@Auth(AuthType.None)
@Controller('session-authentication')
export class SessionAuthenticationController {
  constructor(
    private readonly sessionAuthService: SessionAuthenticationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Req() request: Request, @Body() signInDto: SignInDto) {
    const user = await this.sessionAuthService.signIn(signInDto);
    await promisify(request.logIn).call(request, user);
  }

  @UseGuards(SessionGuard)
  @Get()
  async sayHello(@ActiveUser() user: ActiveUserData) {
    return `Hello, ${user.email}!`;
  }
}
