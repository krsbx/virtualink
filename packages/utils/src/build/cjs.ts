import { resolve } from 'node:path';
import { build as tsup, type Options as BuildOptions } from 'tsup';

export function fixBuild(source: string) {
  return Bun.write(
    resolve(source, 'dist/cjs/package.json'),
    JSON.stringify(
      {
        type: 'commonjs',
      },
      null,
      2
    )
  );
}

export async function build(source: string, options: BuildOptions = {}) {
  await tsup({
    splitting: false,
    entry: [
      resolve(source, 'src/**/*.ts'),
      `!${resolve(source, 'src/**/*.d.ts')}`,
    ],
    external: ['bun', 'bun:sqlite'],
    format: ['cjs'],
    outDir: 'dist/cjs',
    minify: false,
    bundle: false,
    treeshake: true,
    sourcemap: false,
    clean: true,
    skipNodeModulesBundle: true,
    dts: true,
    legacyOutput: true,
    ...options,
  });

  fixBuild(source);
}
