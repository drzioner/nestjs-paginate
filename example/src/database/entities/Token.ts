import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './index';
import { Status } from '../../common/enums';

@Entity('tokens')
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'text', unique: true, nullable: false })
  public token: string;

  @ManyToOne(() => User, (user) => user.tokens, { lazy: true })
  public user: User;

  @Column({ type: 'varchar', default: Status.ACTIVE, length: 8 })
  public status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  public deletedAt: Date;
}
