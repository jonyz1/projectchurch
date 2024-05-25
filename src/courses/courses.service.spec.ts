// import { Test, TestingModule } from '@nestjs/testing';
// import { CoursesService } from './courses.service';

// describe('CoursesService', () => {
//   let service: CoursesService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [CoursesService],
//     }).compile();

//     service = module.get<CoursesService>(CoursesService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

import { Test } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

describe('CoursesController', () => {
  let courseController: CoursesController;
  let courseService: CoursesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [CoursesController],
        providers: [CoursesService],
      }).compile();

      courseService = moduleRef.get<CoursesService>(CoursesService);
      courseController = moduleRef.get<CoursesController>(CoursesController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = 'hello';
      jest.spyOn(courseService, 'get').mockImplementation(() => result);

      expect( await courseController.get()).toBe(result);
    });
  });
});
