import WalletConnectProvider from '@walletconnect/web3-provider';

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: 'asdf',
    },
  },
};
