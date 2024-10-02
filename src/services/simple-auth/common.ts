import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";

import idl from "./idl/simple_auth.json";
import { SimpleAuth } from "./types/simple_auth";
import { Wallet } from "@solana/wallet-adapter-react";
import { SignerWalletAdapterProps } from "@solana/wallet-adapter-base";

export const PROGRAM_ID = new PublicKey(idl.address);
export const getProgram = (
  connection: Connection,
  publicKey: PublicKey,
  wallet: Wallet,
  signTransaction: SignerWalletAdapterProps["signTransaction"],
  signAllTransactions: SignerWalletAdapterProps["signAllTransactions"]
): Program<SimpleAuth> => {
  const provider = new AnchorProvider(
    connection,
    {
      ...wallet,
      publicKey,
      signTransaction,
      signAllTransactions,
    },
    { preflightCommitment: "processed" }
  );
  return new Program<SimpleAuth>(idl as SimpleAuth, provider);
};
