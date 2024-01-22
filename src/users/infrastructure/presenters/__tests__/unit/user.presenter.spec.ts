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
  describe('constructor', () => {
    it('should be defined', () => {
      const sut = new UserPresenter(props)
      expect(sut.id).toEqual(props.id)
      expect(sut.name).toEqual(props.name)
      expect(sut.email).toEqual(props.email)
      expect(sut.createdAt).toEqual(props.createdAt)
    })
  })
})
