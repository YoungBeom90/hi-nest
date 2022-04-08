import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    // service.create({
    //   title: "Test movie",
    //   year: 2022,
    //   genres: ["action"]
    // });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll()", () => {

    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });

  });

  describe("getOne()", () => {
    
    it("should return an movie", () => {
      
      let movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID (999) not found!");
      }
    });

  });

  describe("deleteOne()", () => {

    it("deletes a movie", () => {
      console.log(service.getAll());
      const beforeDelete = service.getAll().length;

      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it("should return a NotFoundException", () => {
      try {
        service.deleteOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create()", () => {
    it("create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "Test movie2",
        year: 2023,
        genres: ["action"]
      });
      let afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update()", () => {
    it("update a movie", () => {
      service.update(1, {title: "Update Test"});
      const movie = service.getOne(1);
      
      expect(movie.title).toEqual("Update Test");
    });

    it("should throw a NotFoundException", () => {
      try {
        service.update(999, {});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  })

});
