import React from 'react';
import { EthereumIcon, BinanceIcon, SolanaIcon, USDTIcon, USDCoinIcon } from '../icons/Icons';
import { SCREENS } from '../constants.js';

const WalletBalanceScreen = ({ account, balance, setCurrentScreen }) => {
  // Select a token to use for payment
  const selectToken = (tokenType) => {
    // For now, only ETH is supported for payment
    if (tokenType === 'eth') {
      // Go back to purchase screen
      setCurrentScreen(SCREENS.PURCHASE);
    } else {
      alert('Currently only ETH payments are supported.');
    }
  };
  
  return (
    <div className="screen wallet-balance-screen">
      <div className="header">
        {account ? `Wallet: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : "Wallet Balance"}
      </div>
      
      <div className="tabs">
        <button className="tab active">ALL</button>
        <button className="tab">
          <EthereumIcon /> ETH
        </button>
        <button className="tab">
          <BinanceIcon /> BSC
        </button>
        <button className="tab">
          <SolanaIcon /> SOL
        </button>
      </div>
      
      <div className="token-list">
        {balance && (
          <div className="token-item" onClick={() => selectToken('eth')} style={{ cursor: 'pointer' }}>
            <div className="token-info">
              <EthereumIcon /> Ethereum
              <div className="token-symbol">ETH</div>
            </div>
            <div className="token-balance">
              <div className="token-value">~${(parseFloat(balance) * 3122).toFixed(2)}</div>
              <div className="token-amount">{parseFloat(balance).toFixed(4)}</div>
            </div>
          </div>
        )}
        
        <div className="token-item" onClick={() => selectToken('bnb')} style={{ cursor: 'pointer' }}>
          <div className="token-info">
            <BinanceIcon /> Binance Coin
            <div className="token-symbol">BNB</div>
          </div>
          <div className="token-balance">
            <div className="token-value">~$0.00</div>
            <div className="token-amount">0.000</div>
          </div>
        </div>
        
        <div className="token-item" onClick={() => selectToken('sol')} style={{ cursor: 'pointer' }}>
          <div className="token-info">
            <SolanaIcon /> Solana
            <div className="token-symbol">SOL</div>
          </div>
          <div className="token-balance">
            <div className="token-value">~$0.00</div>
            <div className="token-amount">0.000</div>
          </div>
        </div>
        
        <div className="token-item" onClick={() => selectToken('usdt')} style={{ cursor: 'pointer' }}>
          <div className="token-info">
            <USDTIcon /> USDT
            <div className="token-symbol">ETH</div>
          </div>
          <div className="token-balance">
            <div className="token-value">~$0.00</div>
            <div className="token-amount">0.000</div>
          </div>
        </div>
        
        <div className="token-item" onClick={() => selectToken('usdc')} style={{ cursor: 'pointer' }}>
          <div className="token-info">
            <USDCoinIcon /> USD Coin
            <div className="token-symbol">ETH</div>
          </div>
          <div className="token-balance">
            <div className="token-value">~$0.00</div>
            <div className="token-amount">0.000</div>
          </div>
        </div>
      </div>
      
      <button className="btn back-btn" onClick={() => setCurrentScreen(SCREENS.PURCHASE)}>Back to Purchase</button>
    </div>
  );
};

export default WalletBalanceScreen;