import { Album } from "src/album/album.entity";
import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100, nullable: false })
    name: string;

    @Column({ length: 500, nullable: false })
    bio: string;

    @OneToOne(() => User, user => user.artist)
    @JoinColumn()
    user: User;

    @OneToMany(() => Album, album => album.artists)
    @JoinTable({ name: 'artist_album' }) // Define the JoinTable name explicitly
    albums: Album[];
}