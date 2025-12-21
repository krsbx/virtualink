import { build } from '@virtualink/utils';

await build(__dirname, {
  buildCjs: true,
  buildEsm: true,
});
