import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';
import {
  Permission,
  PermissionType,
} from '../../iam/authorization/permission.type';
import { ApiKey } from '../api-keys/entities/api-key.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  @Column({ enum: Permission, default: [], type: 'json' })
  permissions: PermissionType[];

  @OneToMany(() => ApiKey, (apiKey) => apiKey.user, { cascade: true })
  apiKeys: ApiKey;
}
