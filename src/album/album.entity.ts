import { Artist } from "src/artist/artist.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'albums' })
export class Album {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100, nullable: false })
    title: string;

    @Column({ name: 'artwork_url', nullable: false })
    artworkUrl: string;


    @ManyToMany(() => Artist, artist => artist.albums)
    @JoinTable()  
    artists: Artist[];
}
