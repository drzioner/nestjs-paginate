import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../common/enums';
import { City, Department, IdentificationType } from './index';

@Entity('contacts')
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'varchar', length: 150, nullable: false })
  public name: string;
  @Column({ type: 'varchar', length: 150, nullable: true })
  public lastname: string;
  @Column({
    name: 'identification_number',
    type: 'varchar',
    unique: true,
    nullable: true,
  })
  public identificationNumber: string;
  @Column({ type: 'varchar', unique: true, nullable: false })
  public email: string;
  @Column({ type: 'varchar', nullable: true })
  public phone: string;
  @Column({ type: 'text', nullable: false })
  public direction: string;

  @ManyToOne(
    () => IdentificationType,
    (identificationType) => identificationType.contacts,
    {
      nullable: true,
      eager: true,
    },
  )
  @JoinColumn({ name: 'identification_type_id' })
  public identificationType: IdentificationType;

  @ManyToOne(() => Department, (department) => department.contacts, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'department_id' })
  public department: Department;

  @ManyToOne(() => City, (city) => city.contacts, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'city_id' })
  public city: City;

  @Column({ type: 'varchar', default: Status.ACTIVE, length: 8 })
  public status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  public deletedAt: Date;
}
