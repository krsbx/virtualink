import type { Property } from '../properties/types';
import { DefaultPersonaEmotions, DefaultPersonaOutput } from './constants';
import { propertyToPrompt } from './prompter';
import type { ParsePersonaOutput, VirtualPersonaOptions } from './types';

export class VirtualPersona<
  ExpectedOutput extends Record<string, Property> = DefaultPersonaOutput,
  Emotions extends readonly string[] = DefaultPersonaEmotions,
> {
  private _name: string;
  private _background: string;
  private _expectedOutput: ExpectedOutput;
  private _emotions: Emotions;

  public readonly _output!: ParsePersonaOutput<ExpectedOutput, Emotions>;

  constructor(options: VirtualPersonaOptions<ExpectedOutput, Emotions>);
  constructor(name: string, background: string);
  constructor(name: string, background: string, expectedOutput: ExpectedOutput);
  constructor(
    name: string,
    background: string,
    expectedOutput: ExpectedOutput,
    emotions: Emotions
  );
  constructor(
    ...args:
      | [VirtualPersonaOptions<ExpectedOutput>]
      | [name: string, background: string]
      | [name: string, background: string, expectedOutput: ExpectedOutput]
      | [
          name: string,
          background: string,
          expectedOutput: ExpectedOutput,
          emotions: Emotions,
        ]
  ) {
    if (args.length === 1) {
      const { name, background, expectedOutput, emotions } = args[0];

      this._name = name;
      this._background = background;
      this._expectedOutput = (expectedOutput ??
        DefaultPersonaOutput) as ExpectedOutput;
      this._emotions = (emotions ?? DefaultPersonaEmotions) as Emotions;
    } else {
      const [name, background, expectedOutput, emotions] = args;

      this._name = name;
      this._background = background;

      this._expectedOutput = (expectedOutput ??
        DefaultPersonaOutput) as ExpectedOutput;
      this._emotions = (emotions ?? DefaultPersonaEmotions) as Emotions;
    }
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

  public toPrompt() {
    const system = `You are ${this._name}. ${this._background}${this._background.endsWith('.') ? '' : '.'}`;

    let user = `
Instructions:
  - Return only a valid flat JSON object — no extra formatting or explanation.
  - Your response should be aligned with your given background and name.
  - Your response should be in the following format:`;

    for (const [key, value] of Object.entries(this._expectedOutput)) {
      user += `\n${propertyToPrompt(key, value, 4)}`;
    }

    user += `\n${propertyToPrompt(
      'emotion',
      {
        values: this._emotions,
        description: 'Your current emotion based on the user input.',
        type: 'enum',
      },
      4
    )}`;

    return {
      system: system.trim(),
      user: user.trim(),
    };
  }

  public infer(): this['_output'] {
    return null as never;
  }
}
