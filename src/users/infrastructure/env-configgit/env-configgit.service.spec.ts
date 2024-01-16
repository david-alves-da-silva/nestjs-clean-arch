import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfiggitService } from './env-configgit.service';

describe('EnvConfiggitService', () => {
  let service: EnvConfiggitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvConfiggitService],
    }).compile();

    service = module.get<EnvConfiggitService>(EnvConfiggitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
