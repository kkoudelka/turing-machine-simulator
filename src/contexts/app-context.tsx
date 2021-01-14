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
  setInstructions?: (instructions: IInstruction[]) => void;
  currentInstruction?: IInstruction;
  setCurrentInstruction?: (instruction: IInstruction) => void;
  setNewTape?: (tape: string[]) => void;
  bestValidStep: IInstruction;
}

const defaults: IAppContext = {
  machineState: '0',
  headIndex: 0,
  tape: ['1', '1', '0', '1', '_', '1', '0', '1'],
  instructions: sampleInstructions,
  currentInstruction: null,
  bestValidStep: null,
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

  const [instructions, setInstructions] = useState(defaults.instructions);

  const [currentInstruction, setCurrentInstruction] = useState<IInstruction>(
    defaults.currentInstruction,
  );

  useEffect(() => {
    setHeadIndex(findFirst(tape));

    const lsInstructions = localStorage.getItem('instructions');
    if (lsInstructions) {
      const ins = JSON.parse(lsInstructions) as IInstruction[];
      setInstructions(ins);
    }
  }, []);

  useEffect(() => {
    const ins = JSON.stringify(instructions);
    localStorage.setItem('instructions', ins);
  }, [instructions]);

  useEffect(() => {
    const max = tape.length - 1;
    if (headIndex > max) {
      setHeadIndex(max);
    }
  }, [tape]);

  const headLeft = (): boolean => {
    if (headIndex == 0) {
      setTape(['_', ...tape]);
      return true;
    }

    setHeadIndex(headIndex - 1);
    return true;
  };

  const headRight = (): boolean => {
    if (headIndex == tape.length - 1) {
      setTape([...tape, '_']);
    }

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

  const bestValidStep = instructions.find(
    (x) => x.state == currentState && x.symbol == currentSymbol,
  );

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
        instructions: instructions,
        setInstructions,
        currentInstruction,
        setCurrentInstruction,
        setNewTape: setTape,
        bestValidStep,
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
