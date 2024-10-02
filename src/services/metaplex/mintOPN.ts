import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { Wallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";

export const mintOPN = async (
  connection: Connection,
  wallet: Wallet,
  collectionMint: PublicKey
) => {
  const mpl = new Metaplex(connection);

  mpl.use(walletAdapterIdentity(wallet.adapter));

  const random = Math.floor(Math.random() * 10);

  try {
    // create and mint NFT
    const creation = await mpl.nfts().create({
      name: `OPN #${random}`,
      symbol: "OPN",
      uri: `https://nftstorage.link/ipfs/bafybeib7j7kxkd5u445oewlttohocyc55t6pjmxyyxwtwp65o4zpbwyxhe/${random}.json`,
      sellerFeeBasisPoints: 500,
      collection: collectionMint,
    });

    console.log("Mint NFT", creation.mintAddress.toBase58());

    const verification = await mpl.nfts().verifyCollection({
      collectionMintAddress: collectionMint,
      mintAddress: creation.mintAddress,
    });

    console.log("✅ Verified!", verification.response);
  } catch (error) {
    console.error("Error minting NFT: ", error);
  }
};
