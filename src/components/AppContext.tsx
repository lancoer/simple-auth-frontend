import { FC, ReactNode } from "react";
import { MyThemeContextProvider } from "./MyThemeContext";
import WalletContextProvider from "./WalletContext";
import { AuthContextProvider } from "./AuthContext";

export const AppContext: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MyThemeContextProvider>
      <WalletContextProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </WalletContextProvider>
    </MyThemeContextProvider>
  );
};
