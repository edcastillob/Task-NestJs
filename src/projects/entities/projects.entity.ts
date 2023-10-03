import { Column, Entity, OneToMany } from 'typeorm';
import { IProjects } from '../../interface/projects.interface';
import { BaseEntity } from '../../config/base.entity';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProjects {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UsersProjectsEntity, (usersProjects) => usersProjects.project)
  usersIncludes: UsersProjectsEntity[]
 
}