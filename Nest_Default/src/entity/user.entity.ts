import { Entity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserProfile } from './userProfile.entity';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  first_name: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_name: string | null;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  permission: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  current_refresh_token: string | null;

  @Column({ type: 'timestamp', nullable: true })
  current_refresh_token_exp: Date | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar', nullable: true })
  flag: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hashSync(this.password, 3);
  }

  validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // @OneToOne(() => UserProfile, userProfile => userProfile.user)
  // @JoinColumn({ name: 'user_id' })
  // userProfile: UserProfile;

  @OneToOne(() => UserProfile, userProfile => userProfile.user)
  userProfile: UserProfile;
}
