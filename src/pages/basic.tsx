import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect, useState } from "react";
import {
  ConfirmOptions,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { Nft } from "@metaplex-foundation/js";
import { Button } from "@mui/material";

import NameValue from "../components/NameValue";
import { getWalletNfts, mintOPN } from "../services/metaplex";
import { getProgram } from "../services/simple-auth/common";
import {
  authenticateInstruction,
  deauthenticateInstruction,
  initializeInstruction,
} from "../services/simple-auth";
import { AuthContext } from "../components/AuthContext";

export const opts: ConfirmOptions = {
  preflightCommitment: "processed",
};

const BasicPage = () => {
  const { publicKey, wallet, signTransaction, signAllTransactions } =
    useWallet();
  const { connection } = useConnection();

  const { isAuthenticated, refresh } = useContext(AuthContext);

  const [balance, setBalance] = useState(0);
  const [latestBlock, setLatestBlock] = useState<any>({});
  const [walletNfts, setWalletNfts] = useState<Nft[]>([]);

  useEffect(() => {
    const asyncFun = async () => {
      if (!publicKey) return;

      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);

      const blockHash = await connection.getLatestBlockhash();
      setLatestBlock(blockHash);

      const nfts = await getWalletNfts(connection, publicKey);
      setWalletNfts(nfts);
    };
    asyncFun();
  }, [publicKey, connection]);

  const handleInitializeUser = async () => {
    if (
      isAuthenticated != null ||
      !publicKey ||
      !wallet ||
      !signTransaction ||
      !signAllTransactions
    )
      return;

    console.log("Initialize");

    const program = getProgram(
      connection,
      publicKey,
      wallet,
      signTransaction,
      signAllTransactions
    );

    const ix = await initializeInstruction(program, publicKey);

    const {
      value: { blockhash },
    } = await connection.getLatestBlockhashAndContext();

    try {
      const tx = await signTransaction(
        new VersionedTransaction(
          new TransactionMessage({
            payerKey: publicKey,
            recentBlockhash: blockhash,
            instructions: [ix],
          }).compileToV0Message()
        )
      );
      const txSignature = await connection.sendTransaction(tx, opts);

      // Confirm the transaction was successful.
      const confirmationResult = await connection.confirmTransaction(
        txSignature,
        "confirmed"
      );

      console.log(confirmationResult);

      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuthenticateUser = async () => {
    if (
      isAuthenticated !== false ||
      !publicKey ||
      !wallet ||
      !signTransaction ||
      !signAllTransactions
    )
      return;

    console.log("Authenticate");

    const program = getProgram(
      connection,
      publicKey,
      wallet,
      signTransaction,
      signAllTransactions
    );

    const ix = await authenticateInstruction(program, publicKey);

    const {
      value: { blockhash },
    } = await connection.getLatestBlockhashAndContext();

    try {
      const tx = await signTransaction(
        new VersionedTransaction(
          new TransactionMessage({
            payerKey: publicKey,
            recentBlockhash: blockhash,
            instructions: [ix],
          }).compileToV0Message()
        )
      );
      const txSignature = await connection.sendTransaction(tx, opts);

      // Confirm the transaction was successful.
      const confirmationResult = await connection.confirmTransaction(
        txSignature,
        "confirmed"
      );

      console.log(confirmationResult);

      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeauthenticateUser = async () => {
    if (
      isAuthenticated !== true ||
      !publicKey ||
      !wallet ||
      !signTransaction ||
      !signAllTransactions
    )
      return;

    console.log("Deauthenticate");

    const program = getProgram(
      connection,
      publicKey,
      wallet,
      signTransaction,
      signAllTransactions
    );

    const ix = await deauthenticateInstruction(program, publicKey);

    const {
      value: { blockhash },
    } = await connection.getLatestBlockhashAndContext();

    try {
      const tx = await signTransaction(
        new VersionedTransaction(
          new TransactionMessage({
            payerKey: publicKey,
            recentBlockhash: blockhash,
            instructions: [ix],
          }).compileToV0Message()
        )
      );
      const txSignature = await connection.sendTransaction(tx, opts);

      // Confirm the transaction was successful.
      const confirmationResult = await connection.confirmTransaction(
        txSignature,
        "confirmed"
      );

      console.log(confirmationResult);

      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMintOPN = () => {
    if (!isAuthenticated || !publicKey || !wallet) return;

    mintOPN(
      connection,
      wallet,
      new PublicKey("2XZFL98RKVGENXtAK8ySFiXQsPbeLiQgJ3symuqkNSSN")
    );
  };

  return (
    <>
      <NameValue name="Endpoint" value={connection.rpcEndpoint} />
      <NameValue name="Balance" value={balance} />
      <NameValue name="Latest block" value={JSON.stringify(latestBlock)} />
      <NameValue
        name="Authentication Status"
        value={
          isAuthenticated === undefined
            ? ""
            : isAuthenticated == null
            ? "User not found"
            : isAuthenticated
            ? "True"
            : "False"
        }
      />

      <div
        style={{ display: "flex", flexDirection: "column", gap: 8, margin: 16 }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            variant="contained"
            color="info"
            onClick={handleInitializeUser}
            disabled={isAuthenticated != null}
          >
            Initialize User
          </Button>

          <Button
            variant="contained"
            color="info"
            onClick={handleAuthenticateUser}
            disabled={isAuthenticated !== false}
          >
            Authenticate User
          </Button>

          <Button
            variant="contained"
            color="info"
            onClick={handleDeauthenticateUser}
            disabled={isAuthenticated !== true}
          >
            Deauthenticate User
          </Button>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleMintOPN}
            disabled={!isAuthenticated}
          >
            Mint OPN!
          </Button>

          <span>You are owning {walletNfts.length} $OPN</span>
        </div>

        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            columnGap: 16,
          }}
        >
          {walletNfts.map((nft) => (
            <div
              key={nft.address.toString()}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span>{nft.name}</span>
              <span>
                {nft.json?.name} ({nft.json?.description})
              </span>
              <img src={nft.json?.image} alt="smile" width={360} height={540} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BasicPage;
