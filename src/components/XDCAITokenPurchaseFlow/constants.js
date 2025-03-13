// Screen constants
export const SCREENS = {
    PRESALE: 1,
    CONNECT_WALLET: 2,
    PURCHASE: 3,
    WALLET_BALANCE: 4,
    POST_PURCHASE_METAMASK: 5,
    POST_PURCHASE_XDC: 6,
    TRANSACTION_PROCESSING: 7,
    CONFIRMATION: 8,
    WALLET_CONNECT_QR: 9
  };
  
  // XDC Apothem Network Config
  export const XDC_APOTHEM_CHAIN_ID = '0x33'; // 51 in decimal
  export const XDC_APOTHEM_CONFIG = {
    chainId: XDC_APOTHEM_CHAIN_ID,
    chainName: 'XDC Apothem',
    nativeCurrency: {
      name: 'XDC',
      symbol: 'XDC',
      decimals: 18,
    },
    rpcUrls: ['https://erpc.apothem.network'],
    blockExplorerUrls: ['https://explorer.apothem.network'],
  };