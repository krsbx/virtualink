import { build } from '@virtualink/utils';

await build(__dirname, {
  buildEsm: true,
  buildCjs: true,
  autoUpdateExports: true,
});
