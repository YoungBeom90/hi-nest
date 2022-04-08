import { EntityRepository, Repository } from "typeorm";
import { Movie } from "../entities/movies.entity";


@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {}