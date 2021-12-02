import { Controller,Request,Get, Post, UseGuards,  } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guards';
import { get } from 'http';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enums';

@Controller()
export class AppController {
  constructor(private authService: AuthService){}

@UseGuards(LocalAuthGuard)
@Post('auth/login')

async login(@Request()req){
  return this.authService.login (req.user);
}
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return {message: `You are logged in as ${req.user.username}`};
}

@UseGuards(JwtAuthGuard)
@Roles(Role.Manage)
@Get('gospel-hits')
getGospel(@Request() req) {
  return {message: 'Hivi reo'};
}
}
