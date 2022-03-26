import * as ExportedModules from './index';

test('should export modules', async () => {
  expect(ExportedModules.default).toBeDefined();
  expect(ExportedModules.useWaitNavigation).toBeDefined();
});
