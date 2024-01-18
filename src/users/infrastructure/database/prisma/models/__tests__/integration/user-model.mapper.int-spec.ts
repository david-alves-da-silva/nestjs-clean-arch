import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service'
import { PrismaClient, User } from '@prisma/client'
import { execSync } from 'node:child_process'
import { UserModelMapper } from '../../user-model.mapper'
import { ValidationError } from '@/shared/domain/errors/validation-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests'

describe('UserModelMapper integration tests', () => {
  let prismaService: PrismaClient
  let props: any
  beforeAll(async () => {
    setupPrismaTests()
    prismaService = new PrismaClient()
    await prismaService.$connect()
  })
  beforeEach(async () => {
    await prismaService.user.deleteMany()
    props = {
      id: '70b5a6b7-1bf7-471c-9e9d-0587e7699b14',
      name: 'Test name',
      email: 'a@a.com',
      password: 'TestPassword123',
      createdAt: new Date(),
    }
  })
  afterAll(async () => {
    await prismaService.$disconnect()
  })
  it('should throws error when user model is invalid', async () => {
    const model: User = Object.assign(props, { name: null })
    expect(() => UserModelMapper.toEntity(model)).toThrow(ValidationError)
  })
  it('should convert a user model to a user entity', async () => {
    const model: User = await prismaService.user.create({ data: props })
    expect(UserModelMapper.toEntity(model)).toBeInstanceOf(UserEntity)
    expect(UserModelMapper.toEntity(model).toJSON()).toStrictEqual(props)
  })
})
