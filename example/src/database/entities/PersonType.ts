import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../common/enums';

@Entity('person_types')
export class PersonType extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'varchar', unique: true, length: 150, nullable: false })
  public name: string;
  @Column({ type: 'varchar', unique: true, length: 25, nullable: true })
  public abbreviation: string;
  @Column({ type: 'text', nullable: true })
  public description: string;
  @Column({ type: 'varchar', default: Status.ACTIVE, length: 8 })
  public status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  public deletedAt: Date;
}
