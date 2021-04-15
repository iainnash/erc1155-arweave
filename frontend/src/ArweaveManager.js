import Arweave from "arweave";
import React, { useCallback, useMemo, useState } from "react";

function ArweaveManager({hasWallet: updateWalletParent}) {
  const arweave = useMemo(() => {
    const arweave = Arweave.init();
    // const info = await arweave.network.getInfo();
    // console.log(info);
    return arweave;
  });

  const [wallet, setWallet] = useState(null);

  const hasWallet = (wallet) => useCallback(async () => {
    console.log(wallet)
    const walletJson = JSON.parse(wallet);
    const address = await arweave.wallets.jwkToAddress(walletJson);
    setWallet({ walletJson, address });
    updateWalletParent(walletJson);
  });

  const hasWalletFile = (evt) => {
    const input = evt.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        hasWallet(e.target.result);
      });
      reader.readAsText(input.files[0]);
    }
  };

  return (
    <div>
      <div>Arweave Wallet</div>
      <div>{wallet ? wallet.address : "Not connected"}</div>
      <div>Upload wallet:</div>
      <input type="file" onChange={hasWalletFile} />
    </div>
  );
}

export default ArweaveManager;
