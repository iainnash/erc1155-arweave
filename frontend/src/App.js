import React from 'react';

import CollectableContract from '@erc1155-arweave/contracts/deployments/rinkeby/Collectable.json';
import MarketplaceContract from '@erc1155-arweave/contracts/deployments/rinkeby/Marketplace.json';

function Page() {
  return <div>page{CollectableContract.address}</div>;
}

export default Page;

