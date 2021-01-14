export default interface IInstruction {
  state: string;
  symbol: string;
  write: string;
  move: 'LEFT' | 'RIGHT';
  newstate: string;
}

const createInstruction = (
  state: string,
  symbol: string,
  write: string,
  move: 'LEFT' | 'RIGHT',
  newstate: string,
): IInstruction => {
  return { state, symbol, write, move, newstate };
};

export { createInstruction };
