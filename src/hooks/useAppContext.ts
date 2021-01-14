import React from 'react';
import { AppContext, IAppContext } from '../contexts/app-context';

const useAppContext = (): IAppContext => {
  return React.useContext(AppContext);
};

export default useAppContext;
