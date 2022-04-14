import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../common/enums';
import { City, Contact } from './index';

@Entity('departments')
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'text', unique: true, nullable: false })
  public name: string;
  @Column({ type: 'varchar', length: 25, nullable: true })
  public code: string;

  @OneToMany(() => City, (cities) => cities.department, { eager: true })
  public cities: City[];

  @OneToMany(() => Contact, (contact) => contact.department)
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
