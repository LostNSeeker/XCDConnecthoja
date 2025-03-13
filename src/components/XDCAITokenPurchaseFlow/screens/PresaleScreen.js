import React from 'react';
import { EthereumIcon, BinanceIcon, SolanaIcon } from '../icons/Icons';
import { SCREENS } from '../constants.js';

const PresaleScreen = ({ setCurrentScreen }) => {
  const handleBuyWithCrypto = () => {
    setCurrentScreen(SCREENS.CONNECT_WALLET);
  };

  return (
    <div className="screen presale-screen">
      <div className="header">Can't find tokens in your wallet?</div>
      
      <div className="main-content">
        <h2>Take advantage of Huge Early Staking Rewards by becoming an early adopter!</h2>
        
        <div className="cta">BUY $XDCAI PRESALE NOW!</div>
        
        <div className="input-box"></div>
        
        <div className="crypto-icons">
          <EthereumIcon />
          <BinanceIcon />
          <SolanaIcon />
        </div>
        
        <div className="action-buttons">
          <button className="btn secondary-btn">Don't Have Crypto</button>
          <button className="btn primary-btn" onClick={handleBuyWithCrypto}>Buy with Crypto</button>
        </div>
        
        <div className="help-links">
          <a href="#" className="info-link">
            <span className="info-icon">ℹ️</span> How to Buy
          </a>
          <a href="#" className="help-link">
            <span className="question-icon">❓</span> Help, My Wallet Won't Connect!
          </a>
        </div>
      </div>
    </div>
  );
};

export default PresaleScreen;