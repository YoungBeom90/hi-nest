import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies/entities/movies.entity';

@Module({
  imports: [
    MoviesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '210.114.6.223',
      port: 3306,
      username: 'ybhh',
      password: 'ybhh310819',
      database: 'ybhh',
      entities: [Movie], // 사용할 entity의 클래스명을 넣어둔다.
      // synchronize: true, // false로 해두는 게 안전하다.
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
