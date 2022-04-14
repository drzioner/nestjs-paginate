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
import { Role } from './index';
import { Status } from '../../common/enums';

@Entity('permissions')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
  public name: string;
  @Column({ type: 'text', nullable: false })
  public description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  public roles: Role[];

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
