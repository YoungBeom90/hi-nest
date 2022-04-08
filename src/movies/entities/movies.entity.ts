import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Movie {
    @PrimaryColumn()
    id: number;
    @Column('text')
    title: string;
    @Column()
    year: number;
    @Column('text')
    genres: string;
}