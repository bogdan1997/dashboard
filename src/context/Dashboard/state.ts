import React, { Dispatch } from 'react';

import { Action } from './types';

export interface DashboardState {
  jwt_token: string;
  rows: any
  fields: any
  table: any
};

interface DashboardContextInterface {
  state: DashboardState;
  dispatch: Dispatch<Action>
}

export const DashboardContext = React.createContext<DashboardContextInterface | undefined>(undefined)

export const useDashboardContext = () => {
  const context = React.useContext(DashboardContext);
  if(context === undefined){
    throw Error('useDashboardContext must be used as a ancestor of DashboardContext.Provider in order to work.')
  }
  return context;
}
