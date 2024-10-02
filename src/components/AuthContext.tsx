import { ReactNode, createContext, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { getProgram } from "../services/simple-auth/common";
import { getAuthenticationState } from "../services/simple-auth";

export const AuthContext = createContext<{
  isAuthenticated: undefined | null | boolean;
  refresh: () => Promise<void>;
}>({
  isAuthenticated: undefined,
  refresh: async () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { publicKey, wallet, signTransaction, signAllTransactions } =
    useWallet();
  const { connection } = useConnection();

  const [isAuthenticated, setIsAuthenticated] = useState<
    undefined | null | boolean
  >();

  const refresh = async () => {
    if (!publicKey || !wallet || !signTransaction || !signAllTransactions) {
      return;
    }

    const program = getProgram(
      connection,
      publicKey,
      wallet,
      signTransaction,
      signAllTransactions
    );

    const authenticationState = await getAuthenticationState(
      program,
      publicKey
    );

    if (authenticationState)
      setIsAuthenticated(authenticationState.isAuthenticated);
    else setIsAuthenticated(null);
  };

  useEffect(() => {
    refresh();
  }, [publicKey]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};
