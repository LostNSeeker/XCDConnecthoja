import React from 'react';
import { EthereumIcon } from '../icons/Icons';
// Removed unused SCREENS import

const PurchaseScreen = ({ 
  account, 
  disconnectWallet, 
  ethAmount, 
  handleEthAmountChange, 
  xdcaiAmount, 
  balance, 
  handleBuyXDCAI, 
  handleShowWalletBalance,
  setCurrentScreen
}) => {
  return (
    <div className="screen purchase-screen">
      <div className="header-banner">The future of AI-powered agents is here - Grab $XDCAI at presale prices & fuel the AI revolution</div>
      
      <div className="sub-header">
        {account ? `Connected: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : "Not connected"}
        {account && (
          <button className="btn secondary-btn" style={{ marginLeft: '10px', padding: '4px 8px', fontSize: '12px' }} onClick={disconnectWallet}>
            Disconnect
          </button>
        )}
      </div>
      
      <div className="main-content">
        <h2>Take advantage of Huge Early Staking Rewards by becoming an early adopter!</h2>
        
        <div className="cta">BUY $XDCAI PRESALE NOW!</div>
        
        <div className="payment-section">
          <div className="pay-with">Pay with ETH</div>
          
          <div className="amount-input-group">
            <input 
              type="number" 
              className="amount-input"
              value={ethAmount}
              onChange={handleEthAmountChange}
              placeholder="0"
            />
            <div 
              className="currency-selector" 
              onClick={handleShowWalletBalance} 
              style={{ cursor: 'pointer' }}
            >
              <EthereumIcon /> ETH <span className="arrow">▼</span>
            </div>
          </div>
          
          <div className="receive-section">
            <div className="label">Receive $XDCAI</div>
            <div className="exchange-rate">1 $XDCAI = $0.0033722</div>
            <input 
              type="text" 
              className="amount-input" 
              value={xdcaiAmount}
              readOnly
              placeholder="0"
            />
          </div>
          
          {balance && parseFloat(ethAmount) > parseFloat(balance) && (
            <div className="error-message">You do not have enough ETH to pay for this transaction.</div>
          )}
          
          <button 
            className="btn primary-btn full-width" 
            onClick={handleBuyXDCAI}
            disabled={!account || parseFloat(ethAmount) <= 0 || (balance && parseFloat(ethAmount) > parseFloat(balance))}
          >
            BUY $XDCAI
          </button>
          
          <div className="balance-link" onClick={handleShowWalletBalance}>
            Show wallet balance
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseScreen;