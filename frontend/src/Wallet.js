import React, { useContext, useCallback, useEffect } from "react";

import { SessionContext } from "./sessioncontext";
import { providerOptions } from "./provideroptions";
import CollectableContract from "@erc1155-arweave/contracts/deployments/rinkeby/Collectable.json";
import MarketplaceContract from "@erc1155-arweave/contracts/deployments/rinkeby/Marketplace.json";
import Web3Modal from "web3modal";

export function MintContract() {
  const session = useContext(SessionContext);

  let web3Modal;
  useEffect(() => {
    web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions,
    });
  }, []);

  const login = useCallback(async () => {
    const provider = await web3Modal.connect();
    await signMessage(provider);
  }, [web3Modal]);

  return (
    <div>
      p
      {session.wallet ? (
        <>
          <div>logged in with {session.wallet}</div>
          <div>
            <button onClick={logout}>log out</button>
          </div>
        </>
      ) : session.loading ? (
        "loading..."
      ) : (
        <p>
          <button className="bg-white p-2 rounded-lg" onClick={login}>
            login to your wallet
          </button>{" "}
          to use walletverify.
        </p>
      )}
      age{CollectableContract.address}
    </div>
  );
}
