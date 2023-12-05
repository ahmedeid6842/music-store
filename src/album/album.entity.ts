import { Artist } from "src/artist/artist.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'albums' })
export class Album {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ name: 'artwork_url' })
  artworkUrl: string;


  @ManyToMany(() => Artist)
  @JoinTable({
    name: 'artist_albums',
    joinColumn: { name: 'album_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artist_id', referencedColumnName: 'id' },
  })
  artists: Artist[];
}
