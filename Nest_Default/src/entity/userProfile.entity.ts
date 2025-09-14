import { Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, OneToOne, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('user_profile')
@Unique(['user_fk'])
export class UserProfile {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @Column({ type: 'int', nullable: false })
  user_fk: number;

  @Column({ type: 'timestamp', nullable: true })
  birth: Date;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column('varchar', { array: true, nullable: true })
  interests: string[];

  // @ManyToOne(() => User, user => user.user_id, { cascade: true, onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'user_fk' })
  // user: User;

  @ManyToOne(() => User, user => user.userProfile, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_fk' })
  user: User;
}


//onetoone
// CREATE TABLE mj_personal.user_profile (
// 	profile_id serial4 NOT NULL,
// 	user_fk int4 NOT NULL,
// 	birth timestamp NULL,
// 	age int4 NULL,
// 	interests _varchar NULL,
// 	CONSTRAINT "PK_8c154faf15b98f494723d9cc45b" PRIMARY KEY (profile_id),
// 	CONSTRAINT "UQ_cc7b5c3675a08dec54656184884" UNIQUE (user_fk),
// 	CONSTRAINT "FK_cc7b5c3675a08dec54656184884" FOREIGN KEY (user_fk) REFERENCES mj_personal.users(user_id) ON DELETE CASCADE
// );

// CREATE TABLE mj_personal.user_profile (
// 	profile_id serial4 NOT NULL,
// 	user_fk int4 NOT NULL,
// 	birth timestamp NULL,
// 	age int4 NULL,
// 	interests _varchar NULL,
// 	CONSTRAINT "PK_8c154faf15b98f494723d9cc45b" PRIMARY KEY (profile_id),
// 	CONSTRAINT "UQ_cc7b5c3675a08dec54656184884" UNIQUE (user_fk),
// 	CONSTRAINT "FK_cc7b5c3675a08dec54656184884" FOREIGN KEY (user_fk) REFERENCES mj_personal.users(user_id) ON DELETE CASCADE
// );
