import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movies.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieRepository } from './repositories/movie.respository';

@Module({
    imports:[TypeOrmModule.forFeature([Movie])],
    controllers: [MoviesController],
    providers: [MoviesService, MovieRepository]
})
export class MoviesModule {}
 