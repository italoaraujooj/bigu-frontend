import { createContext, useState } from "react";

type RequestContextType = {
  loading: boolean;
  inProgress: () => void;
  done: () => void;
};

export const RequestContext = createContext({} as RequestContextType);

export function RequestProvider({ children }: any) {
  const [loading, setLoading] = useState(false);

  function inProgress() {
    setLoading(true);
  }

  function done() {
    setLoading(false);
  }

  return (
    <RequestContext.Provider value={{ loading, inProgress, done }}>
      {children}
    </RequestContext.Provider>
  );
}
