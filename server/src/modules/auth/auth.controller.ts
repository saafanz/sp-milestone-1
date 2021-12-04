import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
    //@UseGuards(localGaurd)
    @Post('loginAuth')
    loginAuth(@Body() req: any): any {  // badal request teb2a body 
      return this.authService.user(req);
    }

    


  /**
   * API endpoint handler for user login
   * @param dto
   */
  @Post('/login')
  login(@Body() dto: AuthDto) {
    // TODO: Add your login logic here
    return this.authService.login(dto);
  }
}
