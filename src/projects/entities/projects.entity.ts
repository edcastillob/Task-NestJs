import { BaseEntity } from 'src/config/base.entity';
import { IProjects } from 'src/interface/projects.interface';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements IProjects {
  @Column()
  name: string;
  @Column()
  description: string;
 
}