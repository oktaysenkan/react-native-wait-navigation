import * as ExportedModules from './index';

test('should export modules', async () => {
  expect(ExportedModules.useWaitNavigation).toBeDefined();
  expect(ExportedModules.default).toBeDefined();
});
