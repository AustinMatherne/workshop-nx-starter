import { UntilDestroyed } from './until-destroyed';

describe('UntilDestroyed', () => {
  it('should work', () => {
    expect(new UntilDestroyed()).toBeDefined();
  });
});
