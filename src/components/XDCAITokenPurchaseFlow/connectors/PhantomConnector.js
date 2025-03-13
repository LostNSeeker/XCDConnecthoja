import React from 'react';

// Check if Phantom is installed
export const isPhantomInstalled = () => {
  if (typeof window === 'undefined') return false;
  
  return typeof window.phantom !== 'undefined' && 
    typeof window.phantom?.solana !== 'undefined';
};

// Connect to Phantom
export const connectPhantom = async (setConnectionError) => {
  if (!isPhantomInstalled()) {
    setConnectionError('Please install Phantom wallet to connect!');
    return { success: false, error: 'Phantom not installed' };
  }

  try {
    const phantomProvider = window.phantom?.solana;
    
    if (!phantomProvider) {
      throw new Error('Phantom not found');
    }
    
    const resp = await phantomProvider.connect();
    
    if (resp) {
      setConnectionError('Phantom connected, but it uses Solana. Please use Metamask for ETH transactions.');
      return { 
        success: true, 
        warning: 'Phantom connected, but it uses Solana. Please use Metamask for ETH transactions.',
        publicKey: resp.publicKey.toString(),
        isSolanaWallet: true
      };
    } else {
      throw new Error('Failed to connect to Phantom');
    }
  } catch (error) {
    console.error("Phantom error:", error);
    
    if (error.code === 4001) {
      setConnectionError('Connection rejected. Please approve the wallet connection.');
    } else {
      setConnectionError('Failed to connect to Phantom: ' + (error.message || 'Unknown error'));
    }
    
    return { success: false, error: error.message || 'Unknown error' };
  }
};