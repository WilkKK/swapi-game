import { CamelCaseToPrettyPipe } from './camel-case-to-prety.pipe';

describe('CamelCaseToPretyPipePipe', () => {
  it('create an instance', () => {
    const pipe = new CamelCaseToPrettyPipe();
    expect(pipe).toBeTruthy();
  });
});
