import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column()
  duration: number;

  @ManyToOne(() => Album, album => album.songs, { onDelete: "CASCADE" })
  album: Album;

  @ManyToOne(type => Artist, artist => artist.songs, { onDelete: "CASCADE" })
  artists: Artist;
}