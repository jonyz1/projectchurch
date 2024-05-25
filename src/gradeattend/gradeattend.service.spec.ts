import { Test, TestingModule } from '@nestjs/testing';
import { GradeattendService } from './gradeattend.service';

describe('GradeattendService', () => {
  let service: GradeattendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradeattendService],
    }).compile();

    service = module.get<GradeattendService>(GradeattendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
