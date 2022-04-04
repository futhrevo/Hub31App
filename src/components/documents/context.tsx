import { createContext, useContext } from 'react';
import { RscDoc } from '../../redux/courses/docReducer';

type DocState = {
  doc?: RscDoc;
  courseId?: string;
  chapId?: string;
  matId?: string;
  basepath?: string;
  baseurl?: string;
  link?: string;
}

type DocActions = {
  setDoc?: (doc: RscDoc) => void;
}

type DocContextType = {
  state: DocState,
  actions: DocActions
}

export const DocContext = createContext<DocContextType>({ state: {}, actions: {} });

export const useDocument = () => useContext(DocContext);
