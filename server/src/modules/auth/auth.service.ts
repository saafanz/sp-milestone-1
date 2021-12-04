import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@sp/schemas';
import { UserService } from '../user/user.service';
import { AuthDto } from './dtos/auth.dto';
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService , private userservice: UserService ) {}

  async user(user: any){
    const payload = {sub: user}

    return{
      access_token: this.jwtService.sign(payload,{secret:process.env.JWT_SECRET,expiresIn:"1h"})
    }
  }

 async validateUser(email: string, password: string): Promise<any>{
    const user = await this.userservice.findByemail({email:email});
    if (user && user.password=== password ) {
      return user;

    }
    return null;

  } 

  /**
   * Determines if the user credentials provided are correct
   * @param dto
   */
  async login(dto: AuthDto) {
    const payload = {
      email: dto.email,
      password:dto.password
    }
    const user = await this.validateUser(payload.email,payload.password);
    if (!user|| user.password!== payload.password ) 
      throw new UnauthorizedException("wrong input")
    return this.jwtService.sign(payload,{secret:process.env.JWT_SECRET,expiresIn:"1h"});

    /* 
      TODO: Add your login logic here to return
      appropriate exceptions when a user/password
      is incorrect. In addition, if a user is found
      and credentials are correct, create a JWT token
      with the entire user object as the payload.
      
      Note: JWT open standard RFC 7519 recommends
      a payload object contain certain "claims".
      As such, it's recommended to create a property
      called "sub" in payload which maps to the user id.
    */
 }
}
