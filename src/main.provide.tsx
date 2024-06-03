import { ReactNode, FC, createContext } from 'react';
import { useImmer } from 'use-immer';

type TSetState = {
  token: string;
};
export type IMainContext = {
  state?: TSetState;
  setState?: (state: TSetState) => void;
};

export const MainContext = createContext<IMainContext>({});

const MainProvider: FC<{
  children: ReactNode;
}> = props => {
  const [state, setSelfState] = useImmer<TSetState>({
    token: '',
  });
  const setState = (state: TSetState) => {
    setSelfState(darft => {
      Object.assign(darft, state);
      return darft;
    });
  };

  return (
    <MainContext.Provider
      value={{
        state,
        setState,
      }}>
      {props?.children}
    </MainContext.Provider>
  );
};

export default MainProvider;
