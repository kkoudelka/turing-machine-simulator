import { createContext, useState } from 'react';
import { sampleInstructions } from '../models';
import IInstruction from '../models/instruction';

export interface IAppContext {
  machineState: string;
  headIndex: number;
  headLeft?: () => boolean;
  headRight?: () => boolean;
  setMachineState?: (state: string) => void;
  line: string[];
  write?: (char: string) => void;
  currentSymbol?: string;
  instructions: IInstruction[];
  currentInstruction?: IInstruction;
  setCurrentInstruction?: (instruction: IInstruction) => void;
}

const defaults: IAppContext = {
  machineState: '0',
  headIndex: 0,
  line: [
    '_',
    '_',
    '_',
    '_',
    '1',
    '1',
    '0',
    '1',
    '_',
    '1',
    '0',
    '1',
    '_',
    '_',
    '_',
    '_',
  ],
  instructions: sampleInstructions,
  currentInstruction: null,
};

export const AppContext = createContext<IAppContext>(defaults);

export const AppContextProvider: React.FC<{} | IAppContext> = ({
  children,
}) => {
  const [currentState, setCurrentState] = useState(defaults.machineState);
  const [headIndex, setHeadIndex] = useState(defaults.headIndex);
  const [line, setLine] = useState(defaults.line);

  const [currentInstruction, setCurrentInstruction] = useState<IInstruction>(
    defaults.currentInstruction,
  );

  const headLeft = (): boolean => {
    if (headIndex == 0) return false;

    setHeadIndex(headIndex - 1);
    return true;
  };

  const headRight = (): boolean => {
    if (headIndex == line.length - 1) return false;

    setHeadIndex(headIndex + 1);
    return true;
  };

  const write = (char: string) => {
    let l = line;
    l[headIndex] = char;
    setLine(l);
  };

  const updateState = (state: string) => {
    setCurrentState(state);
  };

  const getCurrentSymbol = (): string => {
    if (line.length > 0) {
      const sym = line[headIndex];
      return sym;
    }

    return 'Not available';
  };

  const currentSymbol = getCurrentSymbol();

  return (
    <AppContext.Provider
      value={{
        machineState: currentState,
        headIndex,
        headLeft,
        headRight,
        line,
        write,
        setMachineState: updateState,
        currentSymbol,
        instructions: defaults.instructions,
        currentInstruction,
        setCurrentInstruction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const Context = {
  Provider: AppContextProvider,
  Consumer: AppContext.Consumer,
};
