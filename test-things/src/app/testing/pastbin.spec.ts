import {Pastebin} from "./pastebin";

export const testData = {
  id: 1,
  title: 'First',
  language: 'Ru',
  paste: '1111'
}
describe('Check Pastebin', () => {
  it('should create an instance of Pastbin', () => {
    expect(new Pastebin(testData)).toBeTruthy();
  });
  it('should accept values', () => {
    const pasteBin = new Pastebin(testData);
    expect(pasteBin.id).toEqual(1);
    expect(pasteBin.title).toEqual('First');
    expect(pasteBin.language).toEqual('Ru');
    expect(pasteBin.paste).toEqual('1111');
  })
});
