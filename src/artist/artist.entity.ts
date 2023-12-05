import { Album } from "src/album/album.entity";
import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(() => Album, album => album.artists)
    @JoinTable({
        name: 'artist_albums',
        joinColumn: { name: 'artist_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'album_id', referencedColumnName: 'id' },
    })
    albums: Album[];
}