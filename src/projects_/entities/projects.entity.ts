import { Column, Entity, OneToMany } from 'typeorm';
import { IProject } from '../../interface/projects.interface';
import { BaseEntity } from '../../config/base.entity';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => UsersProjectsEntity, (usersProjects) => usersProjects.project)
  usersIncludes: UsersProjectsEntity[]
 
}