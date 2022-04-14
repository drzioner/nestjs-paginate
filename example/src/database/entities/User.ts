import * as bcrypt from 'bcrypt';
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role, Permission, Token } from './index';
import { Status } from '../../common/enums';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;
  @Column({ type: 'varchar', length: 250, nullable: false })
  public name: string;
  @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
  public username: string;
  @Column({ type: 'varchar', unique: true, nullable: false })
  public email: string;
  @Column({ type: 'varchar', nullable: false })
  public password: string;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({ name: 'user_roles' })
  public roles: Role[];

  @OneToMany(() => Token, (token) => token.user, { eager: true })
  public tokens: Token[];

  @Column({ type: 'varchar', default: Status.ACTIVE, length: 8 })
  public status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  public deletedAt: Date;

  permissions: Permission[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @AfterLoad()
  setPermissions() {
    const permissions: Permission[] = [];
    for (const role of this.roles) {
      if (role?.permissions?.length > 0) {
        for (const permission of role.permissions) {
          const search = permissions.find(
            (permissionSearch) => permissionSearch.name === permission.name,
          );
          if (!search) {
            permissions.push(permission);
          }
        }
      }
    }
    this.permissions = permissions;
  }
}
