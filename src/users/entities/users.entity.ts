import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer'
import { UsersProjectsEntity } from './usersProjects.entity';
import { BaseEntity } from '../../config/base.entity';
import { ROLES } from '../../constants/roles';
import { IUser } from '../../interface/user.interface';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column()
  age: number;

  @ApiProperty()
  @Column({unique: true})
  email: string;

  @ApiProperty()
  @Column({unique: true})
  username: string;

  @Exclude()
  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: ROLES})
  role: ROLES;

  @OneToMany(() => UsersProjectsEntity, (usersProjects) => usersProjects.user)
  projectsIncludes: UsersProjectsEntity[]
}
