import type { ParseFullProperty, Property } from '../properties/types';
import { DefaultPersonaEmotions, DefaultPersonaOutput } from './constants';
import type { VirtualPersonaOptions } from './types';

export class VirtualPersona<
  ExpectedOutput extends Record<string, Property> = DefaultPersonaOutput,
  Emotions extends readonly string[] = typeof DefaultPersonaEmotions,
> {
  private _name: string;
  private _background: string;
  private _expectedOutput: ExpectedOutput;
  private _emotions: Emotions;

  constructor(options: VirtualPersonaOptions<ExpectedOutput>);
  constructor(name: string, background: string);
  constructor(name: string, background: string, expectedOutput: ExpectedOutput);
  constructor(
    ...args:
      | [VirtualPersonaOptions<ExpectedOutput>]
      | [name: string, background: string]
      | [name: string, background: string, expectedOutput: ExpectedOutput]
  ) {
    if (args.length === 1) {
      const { name, background, expectedOutput } = args[0];

      this._name = name;
      this._background = background;
      this._expectedOutput = (expectedOutput ??
        DefaultPersonaOutput) as ExpectedOutput;
    } else {
      const [name, background, expectedOutput] = args;

      this._name = name;
      this._background = background;
      this._expectedOutput = (expectedOutput ??
        DefaultPersonaOutput) as ExpectedOutput;
    }

    this._emotions = DefaultPersonaEmotions as unknown as Emotions;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get background() {
    return this._background;
  }

  public set background(background: string) {
    this._background = background;
  }

  public get expectedOutput() {
    return this._expectedOutput;
  }

  public defineExpectedOutput<
    NewExpectedOutput extends Record<string, Property>,
  >(expectedOutput: NewExpectedOutput) {
    this._expectedOutput = expectedOutput as unknown as ExpectedOutput;

    return this as unknown as VirtualPersona<NewExpectedOutput, Emotions>;
  }

  public get emotions() {
    return this._emotions;
  }

  public defineEmotions<NewEmotions extends readonly string[]>(
    emotions: NewEmotions
  ) {
    this._emotions = emotions as unknown as Emotions;

    return this as unknown as VirtualPersona<ExpectedOutput, NewEmotions>;
  }

  public get infer() {
    return null as unknown as ParseFullProperty<ExpectedOutput> & {
      emotion: Emotions[number];
    };
  }
}
