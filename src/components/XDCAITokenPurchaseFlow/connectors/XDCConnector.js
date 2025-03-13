// XDCConnector.js - Helper functions for XDC network connections
import { ethers } from 'ethers';

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

// Function to connect to XDC network
export const connectToXDCNetwork = async () => {
  if (!window.ethereum) {
    throw new Error('Ethereum provider not available');
  }

  try {
    console.log("Attempting to connect to XDC Apothem network...");
    
    // Request network switch to XDC Apothem
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [XDC_APOTHEM_CONFIG],
    });
    
    // Check if successfully switched
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    
    console.log("Current network after switch request:", network);
    
    if (network.chainId === 51) {
      return {
        success: true,
        provider,
        network
      };
    } else {
      return {
        success: false,
        error: 'Failed to switch to XDC Apothem network',
        network
      };
    }
  } catch (error) {
    console.error('Error connecting to XDC network:', error);
    throw error;
  }
};

// Check if already on XDC network
export const isXDCNetwork = async (provider) => {
  if (!provider) return false;
  
  const network = await provider.getNetwork();
  return network.chainId === 51;
};