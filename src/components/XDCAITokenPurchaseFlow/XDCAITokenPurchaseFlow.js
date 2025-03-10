import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './XDCAITokenPurchaseFlow.css';

// Import constants
import { SCREENS, XDC_APOTHEM_CONFIG } from './constants';

// Import wallet connectors - removed unused imports
import { isMetamaskInstalled, connectMetamask, connectToXDCNetwork } from './connectors/MetamaskConnector';
import { connectPhantom } from './connectors/PhantomConnector';
import { connectCoinbase } from './connectors/CoinbaseConnector';
import { connectWalletConnect, WalletConnectQRScreen } from './connectors/WalletConnectConnector';

// Import UI screens
import PresaleScreen from './screens/PresaleScreen';
import ConnectWalletScreen from './screens/ConnectWalletScreen';
import PurchaseScreen from './screens/PurchaseScreen';
import WalletBalanceScreen from './screens/WalletBalanceScreen';
import { PostPurchaseMetamaskScreen, PostPurchaseXDCScreen } from './screens/PostPurchaseScreens';
import { TransactionProcessingScreen, ConfirmationScreen } from './screens/ProcessingAndConfirmation';

// Main component
const XDCAITokenPurchaseFlow = () => {
  // State for form inputs and wallet connection
  const [currentScreen, setCurrentScreen] = useState(SCREENS.PRESALE);
  const [ethAmount, setEthAmount] = useState('0');
  const [xdcaiAmount, setXdcaiAmount] = useState('0');
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletType, setWalletType] = useState(null);
  const [isXdcNetwork, setIsXdcNetwork] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const [processingTransaction, setProcessingTransaction] = useState(false);

  // Connect wallet handler
  const connectWallet = async (type) => {
    let connectResult = { success: false };
    
    try {
      setIsConnecting(true);
      setWalletType(type);
      setConnectionError('');
      
<<<<<<< HEAD
      // Handle the specific wallet type that was clicked
      switch(type) {
        case 'metamask':
          connectResult = await connectMetamask(
            setAccount, 
            setProvider, 
            setBalance, 
            setIsXdcNetwork, 
            setConnectionError
          );
          break;
          
        case 'walletconnect':
          connectResult = await connectWalletConnect(setCurrentScreen, SCREENS);
          return; // WalletConnect handles its own navigation
          
        case 'phantom':
          connectResult = await connectPhantom(setConnectionError);
          break;
          
        case 'coinbase':
          connectResult = await connectCoinbase(
            setAccount, 
            setProvider, 
            setBalance, 
            setIsXdcNetwork, 
            setConnectionError
          );
          break;
          
        default:
          throw new Error('Unsupported wallet type');
      }
=======
      // Ensure we prevent any default navigation behavior
      // Request account access - this should trigger the MetaMask popup
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts',
      });
>>>>>>> 7852522 (commit)
      
      // If connection was successful and returned account, navigate to purchase screen
      if (connectResult.success && connectResult.account) {
        setCurrentScreen(SCREENS.PURCHASE);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      // Check if user rejected the connection
      if (error.code === 4001) {
        setConnectionError('Connection rejected. Please approve the MetaMask connection.');
      } else {
        setConnectionError('Failed to connect wallet: ' + (error.message || 'Unknown error'));
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setBalance(null);
    setCurrentScreen(SCREENS.PRESALE);
  };

  // Connect to XDC network
  const connectToXDC = async () => {
    if (!provider) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      setProcessingTransaction(true);
      
      const result = await connectToXDCNetwork(provider, XDC_APOTHEM_CONFIG);
      
      if (result.success) {
        setIsXdcNetwork(true);
        setCurrentScreen(SCREENS.POST_PURCHASE_XDC);
      } else {
        alert('Failed to switch to XDC Apothem network. Please try again.');
      }
    } catch (error) {
      console.error('Error connecting to XDC network:', error);
      alert('Failed to connect to XDC Apothem network: ' + (error.message || 'Unknown error'));
    } finally {
      setProcessingTransaction(false);
    }
  };

  // Effect to refresh balance if account changes
  useEffect(() => {
    if (provider && account) {
      const getBalance = async () => {
        const balanceWei = await provider.getBalance(account);
        const balanceEth = ethers.utils.formatEther(balanceWei);
        setBalance(balanceEth);
      };
      
      getBalance();
      
      // Listen for account changes
      if (window.ethereum) {
        const handleAccountsChanged = (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            disconnectWallet();
          }
        };
        
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        
        // Cleanup
        return () => {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
      }
    }
  }, [provider, account]);

  const handleBuyXDCAI = () => {
    if (!account) {
      alert('Please connect your wallet first!');
      return;
    }
    
    if (parseFloat(ethAmount) <= 0) {
      alert('Please enter a valid ETH amount!');
      return;
    }
    
    // If MetaMask is already installed, go to the direct XDC connection screen
    if (isMetamaskInstalled()) {
      setCurrentScreen(SCREENS.POST_PURCHASE_XDC);
    } else {
      // If MetaMask is not installed, go to the screen with download instructions
      setCurrentScreen(SCREENS.POST_PURCHASE_METAMASK);
    }
  };

  const handleShowWalletBalance = () => {
    setCurrentScreen(SCREENS.WALLET_BALANCE);
  };

  const handleClaimTokens = () => {
    // Show processing screen first
    setCurrentScreen(SCREENS.TRANSACTION_PROCESSING);
    
    // Simulate transaction processing with a timeout
    setTimeout(() => {
      // After "processing", show confirmation screen
      setCurrentScreen(SCREENS.CONFIRMATION);
    }, 2000);
  };

  const handleEthAmountChange = (e) => {
    setEthAmount(e.target.value);
    // Calculate XDCAI amount based on exchange rate (1 $XDCAI = $0.0033722)
    setXdcaiAmount((parseFloat(e.target.value || 0) / 0.0033722).toFixed(2));
  };

<<<<<<< HEAD
  const handleBackToStart = () => {
    setCurrentScreen(SCREENS.PRESALE);
    // Reset states
    setEthAmount('0');
    setXdcaiAmount('0');
    setAccount(null);
    setProvider(null);
    setBalance(null);
    setWalletType(null);
    setIsXdcNetwork(false);
    setConnectionError('');
  };

=======
  // Screen components
  const PresaleScreen = () => (
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
          <a href="https://www.google.com" className="info-link">
            <span className="info-icon">ℹ️</span> How to Buy
          </a>
          <a href="https://www.google.com" className="help-link">
            <span className="question-icon">❓</span> Help, My Wallet Won't Connect!
          </a>
        </div>
      </div>
    </div>
  );
  
  const ConnectWalletScreen = () => (
    <div className="screen connect-wallet-screen">
      <div className="header">Connect Wallet</div>
      
      <div className="instruction">
        If you already have a wallet, select it from the options below.
        <br />
        {!checkIfWalletIsInstalled() && (
          <div className="install-message">
            You need to install <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="link">Metamask</a> to connect.
          </div>
        )}
      </div>
      
      {connectionError && (
        <div className="error-message" style={{ marginBottom: '15px' }}>
          {connectionError}
        </div>
      )}
      
      <div className="wallet-options">
        <button 
          className="wallet-option" 
          onClick={(e) => {
            e.preventDefault();
            connectWallet('metamask');
          }} 
          disabled={isConnecting}
        >
          <span>Metamask {isConnecting && '(connecting...)'}</span> <MetamaskIcon />
        </button>
        
        <button 
          className="wallet-option" 
          onClick={(e) => {
            e.preventDefault();
            alert('WalletConnect integration coming soon!');
          }} 
          disabled={isConnecting}
        >
          <span>WalletConnect</span> <WalletConnectIcon />
        </button>
        
        <button 
          className="wallet-option" 
          onClick={(e) => {
            e.preventDefault();
            alert('Phantom integration coming soon!');
          }} 
          disabled={isConnecting}
        >
          <span>Phantom</span> <PhantomIcon />
        </button>
        
        <button 
          className="wallet-option" 
          onClick={(e) => {
            e.preventDefault();
            alert('Coinbase Wallet integration coming soon!');
          }} 
          disabled={isConnecting}
        >
          <span>Coinbase Wallet</span> <CoinbaseIcon />
        </button>
      </div>
      
      <button 
        className="btn secondary-btn" 
        style={{ marginTop: '20px' }} 
        onClick={(e) => {
          e.preventDefault();
          setCurrentScreen(1);
        }}
      >
        Back
      </button>
    </div>
  );
  
  const PurchaseScreen = () => (
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
            <div className="currency-selector">
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
  
  const WalletBalanceScreen = () => (
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
          <div className="token-item">
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
        
        <div className="token-item">
          <div className="token-info">
            <BinanceIcon /> Binance Coin
            <div className="token-symbol">BNB</div>
          </div>
          <div className="token-balance">
            <div className="token-value">~$0.00</div>
            <div className="token-amount">0.000</div>
          </div>
        </div>
        
        <div className="token-item">
          <div className="token-info">
            <SolanaIcon /> Solana
            <div className="token-symbol">SOL</div>
          </div>
          <div className="token-balance">
            <div className="token-value">~$0.00</div>
            <div className="token-amount">0.000</div>
          </div>
        </div>
        
        <div className="token-item">
          <div className="token-info">
            <USDTIcon /> USDT
            <div className="token-symbol">ETH</div>
          </div>
          <div className="token-balance">
            <div className="token-value">~$0.00</div>
            <div className="token-amount">0.000</div>
          </div>
        </div>
        
        <div className="token-item">
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
      
      <button className="btn back-btn" onClick={() => setCurrentScreen(3)}>Back to Purchase</button>
    </div>
  );
  
  const PostPurchaseScreen1 = () => (
    <div className="screen post-purchase-screen">
      <div className="header">Thanks for purchasing $XDCAI tokens!</div>
      
      <div className="instruction">
        In order to claim your tokens, please download metamask and connect to the XDC network.
      </div>
      
      <div className="steps">
        <div className="step">
          <div className="step-label">Step 1</div>
          <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="btn primary-btn">
            <MetamaskIcon /> Download Metamask
          </a>
        </div>
        
        <div className="step">
          <div className="step-label">Step 2</div>
          <button className="btn secondary-btn" onClick={connectToXDC}>
            <XDCIcon /> Connect to XDC network!
          </button>
        </div>
      </div>
      
      <div className="final-instruction">
        Once metamask is connected, click on the Claim button below to claim your $XDCAI tokens.
      </div>
      
      <button className="btn primary-btn full-width" onClick={handleClaimTokens} disabled={!account || !isXdcNetwork}>
        Claim $XDCAI tokens!
      </button>
    </div>
  );
  
  const PostPurchaseScreen2 = () => (
    <div className="screen post-purchase-screen">
      <div className="header">Thanks for purchasing $XDCAI tokens!</div>
      
      <div className="instruction">
        In order to claim your tokens, please connect to the XDC network.
      </div>
      
      <button className="btn primary-btn full-width connect-xdc" onClick={connectToXDC}>
        <XDCIcon /> Connect to XDC network!
      </button>
      
      <div className="final-instruction">
        Once the XDC network is connected, click on the Claim button below to claim your $XDCAI tokens.
      </div>
      
      <button className="btn primary-btn full-width" onClick={handleClaimTokens} disabled={!account || !isXdcNetwork}>
        Claim $XDCAI tokens!
      </button>
    </div>
  );
  
>>>>>>> 7852522 (commit)
  // Render current screen based on state
  const renderCurrentScreen = () => {
    switch(currentScreen) {
      case SCREENS.PRESALE:
        return <PresaleScreen setCurrentScreen={setCurrentScreen} />;
        
      case SCREENS.CONNECT_WALLET:
        return (
          <ConnectWalletScreen 
            setCurrentScreen={setCurrentScreen}
            connectWallet={connectWallet}
            isConnecting={isConnecting}
            walletType={walletType}
            connectionError={connectionError}
          />
        );
        
      case SCREENS.PURCHASE:
        return (
          <PurchaseScreen 
            account={account}
            disconnectWallet={disconnectWallet}
            ethAmount={ethAmount}
            handleEthAmountChange={handleEthAmountChange}
            xdcaiAmount={xdcaiAmount}
            balance={balance}
            handleBuyXDCAI={handleBuyXDCAI}
            handleShowWalletBalance={handleShowWalletBalance}
            setCurrentScreen={setCurrentScreen}
          />
        );
        
      case SCREENS.WALLET_BALANCE:
        return (
          <WalletBalanceScreen 
            account={account}
            balance={balance}
            setCurrentScreen={setCurrentScreen}
          />
        );
        
      case SCREENS.POST_PURCHASE_METAMASK:
        return (
          <PostPurchaseMetamaskScreen 
            connectToXDC={connectToXDC}
            processingTransaction={processingTransaction}
            handleClaimTokens={handleClaimTokens}
            account={account}
            isXdcNetwork={isXdcNetwork}
          />
        );
        
      case SCREENS.POST_PURCHASE_XDC:
        return (
          <PostPurchaseXDCScreen 
            connectToXDC={connectToXDC}
            processingTransaction={processingTransaction}
            handleClaimTokens={handleClaimTokens}
            account={account}
            isXdcNetwork={isXdcNetwork}
          />
        );
        
      case SCREENS.TRANSACTION_PROCESSING:
        return (
          <TransactionProcessingScreen 
            ethAmount={ethAmount}
            xdcaiAmount={xdcaiAmount}
          />
        );
        
      case SCREENS.CONFIRMATION:
        return (
          <ConfirmationScreen 
            xdcaiAmount={xdcaiAmount}
            handleBackToStart={handleBackToStart}
          />
        );
        
      case SCREENS.WALLET_CONNECT_QR:
        return <WalletConnectQRScreen setCurrentScreen={setCurrentScreen} SCREENS={SCREENS} />;
        
      default:
        return <PresaleScreen setCurrentScreen={setCurrentScreen} />;
    }
  };

  // Add useEffect to help debug state changes
  useEffect(() => {
    console.log("Current screen changed to:", currentScreen);
    console.log("Current account:", account);
  }, [currentScreen, account]);

  return (
    <div className="xdcai-token-purchase-flow">
      {renderCurrentScreen()}
    </div>
  );
};

export default XDCAITokenPurchaseFlow;