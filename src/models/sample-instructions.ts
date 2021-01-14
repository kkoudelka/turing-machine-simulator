import IInstruction, { createInstruction } from './instruction';

const sampleInstructions: IInstruction[] = [
  createInstruction('0', '0', '', 'RIGHT', '0'),
  createInstruction('0', '1', '', 'RIGHT', '0'),
  createInstruction('0', '_', '', 'RIGHT', '1'),
  createInstruction('1', '0', '', 'RIGHT', '1'),
  createInstruction('1', '1', '', 'RIGHT', '1'),
  createInstruction('1', '_', '', 'LEFT', '2'),
  createInstruction('2', '0', '1', 'LEFT', '2'),
  createInstruction('2', '1', '0', 'LEFT', '3'),
  createInstruction('2', '_', '', 'RIGHT', '5'),
  createInstruction('3', '0', '', 'LEFT', '3'),
  createInstruction('3', '1', '', 'LEFT', '3'),
  createInstruction('3', '_', '', 'LEFT', '4'),
  createInstruction('4', '0', '1', 'RIGHT', '0'),
  createInstruction('4', '1', '0', 'LEFT', '4'),
  createInstruction('4', '_', '1', 'RIGHT', '0'),
  createInstruction('5', '1', '_', 'RIGHT', '5'),
  createInstruction('5', '_', '', 'RIGHT', 'HALT'),
];

export default sampleInstructions;
