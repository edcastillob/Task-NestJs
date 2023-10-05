import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

  @Post('register')
  public async registerUser(@Body() body: UserDTO){
    return await this.userService.createUser(body)
  }

  @Get('all')
  public async findAllUsers(){
    return await this.userService.findUsers()
  }

  @Get(':id')
  public async findUsersById(@Param('id') id: string){
    return await this.userService.findUsersById(id)
  }
  
  @Put('edit/:id')
  public async updateUser(@Param('id') id: string, @Body() body: UserUpdateDTO){
    return await this.userService.updateUser(body, id)
  }
 
  @Delete('delete/:id')
  public async deleteUser(@Param('id') id: string){
    return await this.userService.deleteUser(id)
  }
}
