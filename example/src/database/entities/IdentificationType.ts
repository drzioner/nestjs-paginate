import {
  AfterLoad,
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
import { Contact } from './index';

@Entity('identification_types')
export class IdentificationType extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'varchar', unique: true, length: 250, nullable: false })
  public name: string;
  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  public abbreviation: string;

  @OneToMany(() => Contact, (contact) => contact.identificationType)
  public contacts: Contact[];

  @Column({ type: 'varchar', default: Status.ACTIVE, length: 8 })
  public status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  public deletedAt: Date;

  @AfterLoad()
  setAbbreviation() {
    const abbreviationString = this.abbreviation;
    this.abbreviation = abbreviationString.toUpperCase();
  }
}
