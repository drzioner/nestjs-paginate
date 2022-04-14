import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User, Permission } from './index';
import { Status } from '../../common/enums';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'varchar', unique: true, length: 50, nullable: false })
  public name: string;
  @Column({ type: 'text', nullable: false })
  public description: string;

  @ManyToMany(() => User, (user) => user.roles, { lazy: true })
  public users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    eager: true,
  })
  @JoinTable({ name: 'role_permissions' })
  public permissions: Permission[];

  @Column({ type: 'varchar', default: Status.ACTIVE, length: 8 })
  public status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  public deletedAt: Date;

  @AfterLoad()
  setName() {
    const nameString = this.name;
    this.name = nameString.toUpperCase();
  }
}
