import type { Property } from '../properties/types';

export interface VirtualPersonaOptions<
  ExpectedOutput = Record<string, Property>,
> {
  name: string;
  background: string;
  expectedOutput?: ExpectedOutput;
}
