import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { User } from '@prisma/client'
import { EditUserDto } from './dto/edit-user.dto'
import { UserService } from './user.service'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // getMe(@Req() req: Request) {
  //   return req.user
  // }
  @Get('me')
  getMe(@GetUser() user: User) {
    return user
  }
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto)
  }
}
