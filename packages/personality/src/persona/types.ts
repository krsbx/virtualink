import type {
  EmotionProperty,
  ParseFullProperty,
  Property,
} from '../properties/types';

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

export interface PersonaDefition<
  Name extends string,
  Background extends string,
  Code extends string | null,
  ExpectedOutput extends Record<string, Property>,
  ExpectedEmotion extends readonly EmotionProperty[],
> {
  /**
   * The name of the persona
   */
  name: Name;
  /**
   * The background of the persona
   */
  background: Background;
  /**
   * The code of the persona, will be used to store the prompt history informations
   */
  code?: Code;
  /**
   * Expected output format from the persona
   */
  output: ExpectedOutput;
  /**
   * Expected emotion output from the persona
   */
  emotion: ExpectedEmotion;
}

export type PersonaOutput<
  ExpectedOutput extends Record<string, Property>,
  ExpectedEmotion extends readonly EmotionProperty[],
> = ParseFullProperty<ExpectedOutput> & {
  emotion: ExpectedEmotion[number]['name'];
};
