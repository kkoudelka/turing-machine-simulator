import { createContext, useEffect, useState } from 'react';
import { sampleInstructions } from '../models';
import IInstruction from '../models/instruction';

export interface IAppContext {
  machineState: string;
  headIndex: number;
  headLeft?: () => boolean;
  headRight?: () => boolean;
  setMachineState?: (state: string) => void;
  tape: string[];
  write?: (char: string) => void;
  currentSymbol?: string;
  instructions: IInstruction[];
  currentInstruction?: IInstruction;
  setCurrentInstruction?: (instruction: IInstruction) => void;
}

const defaults: IAppContext = {
  machineState: '0',
  headIndex: 0,
  tape: [
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

const findFirst = (tape: string[]) => {
  const index = tape.findIndex((x) => x != '_');
  return index < 0 ? 0 : index;
};

export const AppContext = createContext<IAppContext>(defaults);

export const AppContextProvider: React.FC<{} | IAppContext> = ({
  children,
}) => {
  const [currentState, setCurrentState] = useState(defaults.machineState);
  const [headIndex, setHeadIndex] = useState(defaults.headIndex);
  const [tape, setTape] = useState(defaults.tape);

  const [currentInstruction, setCurrentInstruction] = useState<IInstruction>(
    defaults.currentInstruction,
  );

  useEffect(() => {
    setHeadIndex(findFirst(tape));
  }, []);

  const headLeft = (): boolean => {
    if (headIndex == 0) return false;

    setHeadIndex(headIndex - 1);
    return true;
  };

  const headRight = (): boolean => {
    if (headIndex == tape.length - 1) return false;

    setHeadIndex(headIndex + 1);
    return true;
  };

  const write = (char: string) => {
    let l = tape;
    l[headIndex] = char;
    setTape(l);
  };

  const updateState = (state: string) => {
    setCurrentState(state);
  };

  const getCurrentSymbol = (): string => {
    if (tape.length > 0) {
      const sym = tape[headIndex];
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
        tape,
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
