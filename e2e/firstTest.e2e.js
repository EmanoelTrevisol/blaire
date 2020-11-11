describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have step 1 on screen', async () => {
    await expect(element(by.id('step-one'))).toBeVisible();
  });

  it('should have debug instructions on screen', async () => {
    await expect(element(by.id('debug-instructions'))).toBeVisible();
  });
});
