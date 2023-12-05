import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100, unique: true, nullable: false })
    email: string;

    @Column({ length: 50, name: "user_name", unique: true, nullable: false })
    userName: string;

    @Column({nullable: false})
    password: string;

    @Column({ nullable: true, name: "verification_code" })
    verificationCode: string;

    @Column({ default: false, name: "is_verified" })
    isVerified: boolean;

    @Column({ name: "verification_code_expires_at", type: "timestamp", nullable: true })
    verificationCodeExpiresAt: Date;
}