import { RemoveDotsAndDashesFormat } from '@common/utils/formaters/remove-dots-and-dashes.format'

describe('[Formaters] Remove Dots and Dashes Format', () => {
  it('should remove dots and dashes from the input string', () => {
    const input: string = '1.2.3-4'
    const expectedOutput: string = '1234'
    const result: string = RemoveDotsAndDashesFormat(input)

    expect(result).toEqual(expectedOutput)
  })

  it('should return the same string if there are no dots or dashes', () => {
    const input: string = '1.23'
    const expectedOutput: string = '123'
    const result: string = RemoveDotsAndDashesFormat(input)

    expect(result).toEqual(expectedOutput)
  })
})
