import { Test, TestingModule } from '@nestjs/testing';
import { GradeattendController } from './gradeattend.controller';

describe('GradeattendController', () => {
  let controller: GradeattendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradeattendController],
    }).compile();

    controller = module.get<GradeattendController>(GradeattendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
