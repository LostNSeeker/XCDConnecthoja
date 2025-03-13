import React from 'react';
import { ethers } from 'ethers';

// Check if Coinbase Wallet is installed - improved detection
export const isCoinbaseInstalled = () => {
  if (typeof window === 'undefined') return false;
  
  // More thorough detection methods
  const hasCoinbaseProvider = typeof window.ethereum !== 'undefined' && 
    (window.ethereum.isCoinbaseWallet || 
     window.ethereum.providers?.some(p => p.isCoinbaseWallet) ||
     window.coinbaseWalletExtension);
     
  // Log detection results for debugging
  console.log("Coinbase Wallet detection:", {
    ethereum: typeof window.ethereum !== 'undefined',
    isCoinbaseWallet: window.ethereum?.isCoinbaseWallet,
    hasProviders: !!window.ethereum?.providers,
    coinbaseWalletExtension: !!window.coinbaseWalletExtension
  });
  
  return hasCoinbaseProvider;
};

// Connect to Coinbase Wallet
export const connectCoinbase = async (setAccount, setProvider, setBalance, setIsXdcNetwork, setConnectionError) => {
  console.log("Attempting to connect to Coinbase Wallet...");
  
  if (!isCoinbaseInstalled()) {
    console.log("Coinbase Wallet not detected");
    setConnectionError('Please install Coinbase Wallet to connect!');
    return { success: false, error: 'Coinbase Wallet not installed' };
  }

  try {
    // Try multiple methods to get Coinbase provider
    let coinbaseProvider;
    
    // Method 1: Check if window.ethereum is directly Coinbase Wallet
    if (window.ethereum?.isCoinbaseWallet) {
      console.log("Found Coinbase Wallet as primary provider");
      coinbaseProvider = window.ethereum;
    }
    // Method 2: Check in providers array
    else if (window.ethereum?.providers) {
      console.log("Searching for Coinbase Wallet in providers array");
      coinbaseProvider = window.ethereum.providers.find(p => p.isCoinbaseWallet);
    }
    // Method 3: Check for coinbaseWalletExtension
    else if (window.coinbaseWalletExtension) {
      console.log("Found coinbaseWalletExtension");
      coinbaseProvider = window.coinbaseWalletExtension;
    }
    
    if (!coinbaseProvider) {
      console.log("Coinbase Wallet provider not found");
      throw new Error('Coinbase Wallet provider not found');
    }
    
    console.log("Requesting accounts from Coinbase Wallet...");
    
    // Request accounts
    const accounts = await coinbaseProvider.request({ method: 'eth_requestAccounts' });
    
    console.log("Coinbase accounts received:", accounts);
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts returned from Coinbase Wallet');
    }
    
    const account = accounts[0];
    setAccount(account);
    
    const ethersProvider = new ethers.providers.Web3Provider(coinbaseProvider, 'any');
    setProvider(ethersProvider);
    
    // Get balance
    const balanceWei = await ethersProvider.getBalance(account);
    const balanceEth = ethers.utils.formatEther(balanceWei);
    setBalance(balanceEth);
    
    // Get network
    const network = await ethersProvider.getNetwork();
    setIsXdcNetwork(network.chainId === 51);
    
    return { 
      success: true, 
      provider: ethersProvider,
      account: account,
      balance: balanceEth,
      isXdcNetwork: network.chainId === 51
    };
  } catch (error) {
    console.error("Coinbase Wallet error:", error);
    
    if (error.code === 4001) {
      setConnectionError('Connection rejected. Please approve the wallet connection.');
    } else {
      setConnectionError('Failed to connect to Coinbase Wallet: ' + (error.message || 'Unknown error'));
    }
    
    return { success: false, error: error.message || 'Unknown error' };
  }
};