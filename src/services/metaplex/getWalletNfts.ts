import { isNft, Metaplex, Nft } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";

export const getWalletNfts = async (
  connection: Connection,
  owner: PublicKey
): Promise<Nft[]> => {
  const mpl = new Metaplex(connection);
  const metadatas = await mpl.nfts().findAllByOwner({ owner });

  const data = await Promise.all(
    metadatas.map(async (metadata) => {
      if (metadata.model === "metadata") {
        const n = await mpl.nfts().load({
          metadata,
          loadJsonMetadata: false,
        });

        if (
          n.collection?.address.toString() !==
          "2XZFL98RKVGENXtAK8ySFiXQsPbeLiQgJ3symuqkNSSN"
        )
          return {};

        try {
          const json = await (await fetch(n.uri)).json();
          return { ...n, json };
        } catch {
          return {};
        }
      }
      return {};
    })
  );

  return data.filter(isNft);
};
