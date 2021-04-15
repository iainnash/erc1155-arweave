import Arweave from "arweave";
import React, { useMemo, useState } from "react";

function ArweaveManager({hasWallet: updateWalletParent}) {
  const { arweave, info } = useMemo(async () => {
    const arweave = Arweave.init();
    const info = await arweave.getInfo();
    return {
      arweave,
      info,
    };
  });

  const [wallet, setWallet] = useState(null);

  const hasWallet = (wallet) => {
    const walletJson = JSON.parse(wallet);
    const address = arweave.wallet.jwkToAddress(walletJson);
    setWallet({ walletJson, address });
    updateWalletParent(walletJson);
  };

  const hasWalletFile = (evt) => {
    const input = evt.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        hasWallet(e.target.result);
      });
    }
  };

  return (
    <div>
      <div>Arweave Wallet</div>
      <div>{wallet ? wallet.address : "Not connected"}</div>
      <div>Upload wallet:</div>
      <input type="file" onChange={hasWallet} />
    </div>
  );
}

export default ArweaveManager;
