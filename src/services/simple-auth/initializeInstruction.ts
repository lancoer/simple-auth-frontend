import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import { SimpleAuth } from "./types/simple_auth";

export const initializeInstruction = async (
  program: Program<SimpleAuth>,
  user: PublicKey
) => await program.methods.initialize(user).instruction();
