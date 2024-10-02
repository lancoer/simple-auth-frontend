import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import { getAuthenticationStateAddress } from "../../utils/pda";

import { PROGRAM_ID } from "./common";
import { SimpleAuth } from "./types/simple_auth";

export const getAuthenticationState = async (
  program: Program<SimpleAuth>,
  user: PublicKey
) => {
  const [authenticationStateAddress] = getAuthenticationStateAddress(
    user,
    PROGRAM_ID
  );
  try {
    const authenticationState = await program.account.authenticationState.fetch(
      authenticationStateAddress
    );

    return authenticationState;
  } catch (error) {
    // console.error(error);
    return null;
  }
};
