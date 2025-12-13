import type { EmotionProperty, Property } from '../properties/types';
import { propertyToPrompt } from './prompter';
import type { PersonaDefition, PersonaOutput } from './types';

export class VirtualPersona<
  Name extends string,
  Background extends string,
  Code extends string | null,
  ExpectedOutput extends Record<string, Property>,
  ExpectedEmotion extends readonly EmotionProperty[],
> {
  public readonly _output!: PersonaOutput<ExpectedOutput, ExpectedEmotion>;

  public readonly definition: PersonaDefition<
    Name,
    Background,
    Code,
    ExpectedOutput,
    ExpectedEmotion
  >;

  public constructor();
  public constructor(
    definition: PersonaDefition<
      Name,
      Background,
      Code,
      ExpectedOutput,
      ExpectedEmotion
    >
  );
  public constructor(
    name: Name,
    background: Background,
    output: ExpectedOutput
  );
  public constructor(
    name: Name,
    background: Background,
    output: ExpectedOutput,
    emotion: ExpectedEmotion
  );
  public constructor(
    ...args:
      | []
      | [
          PersonaDefition<
            Name,
            Background,
            Code,
            ExpectedOutput,
            ExpectedEmotion
          >,
        ]
      | [
          name: Name,
          background: Background,
          output: ExpectedOutput,
          emotion?: ExpectedEmotion,
        ]
  ) {
    if (args.length === 0) {
      this.definition = {} as never;

      console.log(
        '[WARN] VirtualPersona constructor called with no arguments!'
      );
      console.log(
        '[WARN] Please provide a name, background, output, and emotion by calling the proper methods.'
      );

      return;
    }

    if (args.length === 1) {
      this.definition = args[0];
    } else {
      const [name, background, output, emotion] = args;

      this.definition = {
        name,
        background,
        output,
        emotion: (emotion ?? []) as never,
      };
    }
  }

  public name<Name extends string>(name: Name) {
    this.definition.name = name as never;

    return this as unknown as VirtualPersona<
      Name,
      Background,
      Code,
      ExpectedOutput,
      ExpectedEmotion
    >;
  }

  public background<Background extends string>(background: Background) {
    this.definition.background = background as never;

    return this as unknown as VirtualPersona<
      Name,
      Background,
      Code,
      ExpectedOutput,
      ExpectedEmotion
    >;
  }

  public code<Code extends string | null>(code: Code) {
    this.definition.code = code as never;

    return this as unknown as VirtualPersona<
      Name,
      Background,
      Code,
      ExpectedOutput,
      ExpectedEmotion
    >;
  }

  public output<ExpectedOutput extends Record<string, Property>>(
    output: ExpectedOutput
  ) {
    this.definition.output = output as never;

    return this as unknown as VirtualPersona<
      Name,
      Background,
      Code,
      ExpectedOutput,
      ExpectedEmotion
    >;
  }

  public emotion<ExpectedEmotion extends readonly EmotionProperty[]>(
    emotion: ExpectedEmotion
  ) {
    this.definition.emotion = emotion as never;

    return this as unknown as VirtualPersona<
      Name,
      Background,
      Code,
      ExpectedOutput,
      ExpectedEmotion
    >;
  }

  public toPrompt() {
    const { name, background, output, emotion } = this.definition;

    const system = `You are ${name}. ${background}${background.endsWith('.') ? '' : '.'}`;

    let user = `
Instructions:
  - Return only a valid flat JSON object — no extra formatting or explanation.
  - Your response should be aligned with your given background and name.
  - Your response should be in the following format:`;

    for (const [key, value] of Object.entries(output)) {
      user += `\n${propertyToPrompt(key, value, 4)}`;
    }

    user += `\n${propertyToPrompt(
      'emotion',
      {
        values: emotion ?? [],
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
