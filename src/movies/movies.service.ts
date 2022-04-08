import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';
import { Movie } from './entities/movies.entity';
import { MovieRepository } from './repositories/movie.respository';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: MovieRepository,
    ) {}

    getAll(): Promise<Movie[]> {
        return this.movieRepository.find();
    }

    getOne(id: number): Promise<Movie> {
        const movie = this.movieRepository.findOne(id);
        if(!movie) {
            throw new NotFoundException(`Movie with ID (${id}) not found!`);
        }
        return movie;
    }

    deleteOne(id: number): boolean {
        this.getOne(id);
        // this. movieRepository = this.movieRepository.filter(movie => movie.id !== id);
        this.movieRepository.delete(id);
        return true;
    }

    create(movieData: CreateMovieDto): boolean {
        // this.movieRepository.push({
        //     id: this.movieRepository.length + 1,
        //     ...movieData,
        // });
        this.movieRepository.save(movieData);
        return true;
    }

    update(id: number, updateData: UpdateMovieDto): boolean {
        let movie = this.getOne(id);
        // this.deleteOne(id);
        // this.movies.push({...movie, ...updateData});
        this.movieRepository.update(id, updateData);
        return true;
    }
}
