import { createContext, useContext } from 'react';
import { QPaper, Question } from '../../redux/qpaper/reducer';

// https://mortenbarklund.com/blog/react-architecture-provider-pattern/

type PaperState = {
  doc?: Question;
  showPreview: boolean;
  paper?: QPaper;
  courseId?: string;
  chapId?: string;
  matId?: string;
  basepath?: string;
  baseurl?: string;
  link?: string;
}

type PaperActions = {
  openPreview?: (doc: Question) => void;
}

type PaperContextType = {
  state: PaperState;
  actions: PaperActions;
}
export const PaperContext = createContext<PaperContextType>({ state: { showPreview: false }, actions: {} });

export const usePaper = () => useContext(PaperContext);
