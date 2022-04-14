import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../common/enums';
import { Contact, Department } from './index';

@Entity('cities')
export class City extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'text', unique: true, nullable: false })
  public name: string;
  @Column({ type: 'varchar', length: 25, nullable: true })
  public code: string;

  @ManyToOne(() => Department, (department) => department.cities)
  @JoinColumn({ name: 'department_id' })
  public department: Department;

  @OneToMany(() => Contact, (contact) => contact.city)
  public contacts: Contact[];

  @Column({ type: 'varchar', default: Status.ACTIVE, length: 8 })
  public status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  public deletedAt: Date;
}
