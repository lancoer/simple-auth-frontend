import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

import { SimpleAuth } from "./types/simple_auth";

export const authenticateInstruction = async (
  program: Program<SimpleAuth>,
  user: PublicKey
) => await program.methods.authenticate(user).instruction();
