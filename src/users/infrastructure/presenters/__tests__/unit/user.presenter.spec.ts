import { instanceToPlain } from 'class-transformer'
import { UserPresenter } from '../../user.presenter'

describe('UserPresenter unit tests', () => {
  const createdAt = new Date()
  const props = {
    id: 'bf291bce-f98b-46ad-84b6-79dd26c4d927',
    name: 'test name',
    email: 'a@a.com',
    password: 'fake',
    createdAt,
  }
  let sut: UserPresenter
  beforeEach(() => {
    sut = new UserPresenter(props)
  })
  describe('constructor', () => {
    it('should be defined', () => {
      expect(sut.id).toEqual(props.id)
      expect(sut.name).toEqual(props.name)
      expect(sut.email).toEqual(props.email)
      expect(sut.createdAt).toEqual(props.createdAt)
    })
  })
  it('should presenter data', () => {
    const output = instanceToPlain(sut)
    expect(output).toStrictEqual({
      id: 'bf291bce-f98b-46ad-84b6-79dd26c4d927',
      name: 'test name',
      email: 'a@a.com',
      createdAt: createdAt.toISOString(),
    })
  })
})
