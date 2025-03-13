import React from 'react';
import { ethers } from 'ethers';

// Check if Metamask is installed
export const isMetamaskInstalled = () => {
  if (typeof window === 'undefined') return false;
  
  return typeof window.ethereum !== 'undefined' && 
    (window.ethereum.isMetaMask || window.ethereum.providers?.some(p => p.isMetaMask));
};

// Connect to Metamask
export const connectMetamask = async (setAccount, setProvider, setBalance, setIsXdcNetwork, setConnectionError) => {
  if (!isMetamaskInstalled()) {
    setConnectionError('Please install MetaMask to connect!');
    return { success: false, error: 'MetaMask not installed' };
  }

  try {
    // Get Metamask provider if multiple providers exist
    const provider = window.ethereum.providers
      ? window.ethereum.providers.find(p => p.isMetaMask)
      : window.ethereum;
      
    if (!provider) {
      throw new Error('MetaMask not found');
    }
    
    console.log("Requesting MetaMask accounts...");
    
    // Clear any previous request states
    setConnectionError('');
    
    // Request accounts from MetaMask - this should trigger the MetaMask popup
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts',
      params: [] // Explicitly include empty params to ensure fresh request
    });
    
    console.log("MetaMask accounts received:", accounts);
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts returned from MetaMask');
    }
    
    const account = accounts[0];
    setAccount(account);
    
    const ethersProvider = new ethers.providers.Web3Provider(provider, 'any');
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
    console.error("MetaMask connection error:", error);
    
    if (error.code === 4001) {
      setConnectionError('Connection rejected. Please approve the wallet connection.');
    } else {
      setConnectionError('Failed to connect to MetaMask: ' + (error.message || 'Unknown error'));
    }
    
    return { success: false, error: error.message || 'Unknown error' };
  }
};

// Connect to XDC network through MetaMask
export const connectToXDCNetwork = async (provider, XDC_APOTHEM_CONFIG) => {
  if (!provider) {
    return { success: false, error: 'Provider not available' };
  }

  try {
    console.log("Requesting network switch to XDC Apothem...");
    
    // Request network switch to XDC Apothem
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [XDC_APOTHEM_CONFIG],
    });
    
    // Check if successfully switched
    const newProvider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await newProvider.getNetwork();
    
    console.log("Current network after switch request:", network);
    
    if (network.chainId === 51) {
      return { success: true, isXdcNetwork: true };
    } else {
      return { success: false, error: 'Failed to switch to XDC Apothem network' };
    }
  } catch (error) {
    console.error('Error connecting to XDC network:', error);
    return { 
      success: false, 
      error: 'Failed to connect to XDC Apothem network: ' + (error.message || 'Unknown error') 
    };
  }
};