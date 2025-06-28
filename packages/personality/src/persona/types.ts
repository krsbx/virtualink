import type { ParseFullProperty, Property } from '../properties/types';

export interface BaseVirtualPersonaOptions {
  name: string;
  background: string;
}

export interface ExtraVirtualPersonaOptions<
  ExpectedOutput extends Record<string, Property> = Record<string, Property>,
  Emotions extends readonly string[] = readonly string[],
> {
  expectedOutput?: ExpectedOutput;
  emotions?: Emotions;
}

export interface VirtualPersonaOptions<
  ExpectedOutput extends Record<string, Property> = Record<string, Property>,
  Emotions extends readonly string[] = readonly string[],
> extends BaseVirtualPersonaOptions,
    ExtraVirtualPersonaOptions<ExpectedOutput, Emotions> {}

export type ParsePersonaOutput<
  ExpectedOutput extends Record<string, Property>,
  Emotions extends readonly string[],
> = ParseFullProperty<ExpectedOutput> & {
  emotion: Emotions[number];
};
