import { createContext, useContext } from 'react';
import { RscVid } from '../../redux/courses/docReducer';

type VidState = {
  doc?: RscVid;
  valid?: boolean;
  courseId?: string;
  chapId?: string;
  matId?: string;
  basepath?: string;
  baseurl?: string;
  link?: string;
}

type VidActions = {
  setDoc?: (doc: RscVid) => void;
}

type VidContextType = {
  state: VidState;
  actions: VidActions;
}

export const VidContext = createContext<VidContextType>({ state: {}, actions: {} });

export const useVideo = () => useContext(VidContext);
