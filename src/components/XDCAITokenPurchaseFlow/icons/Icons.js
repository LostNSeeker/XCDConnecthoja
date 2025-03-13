import React from 'react';

// Icon components
export const MetamaskIcon = () => (
  <span className="wallet-icon metamask-icon">🦊</span>
);

export const EthereumIcon = () => (
  <span className="crypto-icon eth-icon">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="#627EEA">
      <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
    </svg>
  </span>
);

export const BinanceIcon = () => (
  <span className="crypto-icon bnb-icon">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="#F3BA2F">
      <path d="M12 0L5.926 6.074L3.704 3.852L2 5.556L5.926 9.482L12 3.408L18.074 9.482L22 5.556L20.296 3.852L18.074 6.074L12 0Z" />
      <path d="M12 6.815L8.444 10.37L12 13.926L15.556 10.37L12 6.815Z" />
      <path d="M12 17.333L5.926 11.259L3.704 13.482L2 15.185L5.926 19.111L12 13.037L18.074 19.111L22 15.185L20.296 13.482L18.074 11.259L12 17.333Z" />
    </svg>
  </span>
);

export const SolanaIcon = () => (
  <span className="crypto-icon sol-icon">
    <svg viewBox="0 0 24 24" width="24" height="24">
      <linearGradient id="solana-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9945FF" />
        <stop offset="100%" stopColor="#14F195" />
      </linearGradient>
      <path d="M5 15.993h10.496c.3 0 .6-.15.776-.382l2.817-3.766a.81.81 0 000-.992L16.272 7.12a.962.962 0 00-.776-.382H5" stroke="url(#solana-gradient)" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M8 7h11.218c.42 0 .67.475.42.81l-1.786 2.405" stroke="url(#solana-gradient)" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M15 19h-7.218c-.42 0-.67-.475-.42-.81l1.786-2.405" stroke="url(#solana-gradient)" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
    </svg>
  </span>
);

export const WalletConnectIcon = () => (
  <span className="wallet-icon wallet-connect-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6.36 9.77C9.48 6.75 14.52 6.75 17.64 9.77L18.12 10.23C18.32 10.42 18.32 10.74 18.12 10.93L16.94 12.07C16.84 12.16 16.68 12.16 16.58 12.07L15.92 11.43C13.75 9.34 10.25 9.34 8.08 11.43L7.36 12.12C7.26 12.22 7.1 12.22 7 12.12L5.82 10.98C5.62 10.79 5.62 10.47 5.82 10.28L6.36 9.77ZM20.12 12.17L21.18 13.19C21.38 13.38 21.38 13.7 21.18 13.89L15.6 19.28C15.4 19.47 15.08 19.47 14.88 19.28L10.94 15.46C10.89 15.41 10.81 15.41 10.76 15.46L6.82 19.28C6.62 19.47 6.3 19.47 6.1 19.28L0.52 13.89C0.32 13.7 0.32 13.38 0.52 13.19L1.58 12.17C1.78 11.98 2.1 11.98 2.3 12.17L6.24 15.99C6.29 16.04 6.37 16.04 6.42 15.99L10.36 12.17C10.56 11.98 10.88 11.98 11.08 12.17L15.02 15.99C15.07 16.04 15.15 16.04 15.2 15.99L19.14 12.17C19.34 11.98 19.66 11.98 19.86 12.17Z" fill="#3B99FC"/>
    </svg>
  </span>
);

export const PhantomIcon = () => (
  <span className="wallet-icon phantom-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20.4 12.844C20.4 11.941 19.708 11.236 18.823 11.17C18.074 5.59 15.55 5 12 5C8.45 5 5.926 5.59 5.177 11.17C4.292 11.236 3.6 11.941 3.6 12.844C3.6 13.756 4.307 14.468 5.204 14.52C5.944 17.86 8.28 19 12 19C15.72 19 18.056 17.86 18.796 14.52C19.693 14.468 20.4 13.756 20.4 12.844Z" fill="#AB9FF2"/>
      <path d="M12.168 14.064L10.896 12.072C10.836 11.976 10.932 11.856 11.046 11.88L12.822 12.204C12.894 12.216 12.966 12.24 13.026 12.276L14.49 13.236C14.502 13.248 14.496 13.272 14.478 13.272H12.48C12.372 13.272 12.24 13.188 12.168 14.064Z" fill="white"/>
      <path d="M12.222 14.604L10.728 16.176C10.68 16.224 10.602 16.224 10.572 16.164L9.648 14.316C9.624 14.268 9.648 14.208 9.702 14.196L12.036 13.86C12.084 13.848 12.132 13.884 12.132 13.932V14.544C12.132 14.568 12.24 14.592 12.222 14.604Z" fill="white"/>
    </svg>
  </span>
);

export const CoinbaseIcon = () => (
  <span className="wallet-icon coinbase-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#0052FF"/>
      <path d="M12 6C8.7 6 6 8.7 6 12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12C18 8.7 15.3 6 12 6ZM15 12.75H13.5V14.25C13.5 14.4 13.4 14.5 13.25 14.5H10.75C10.6 14.5 10.5 14.4 10.5 14.25V12.75H9C8.85 12.75 8.75 12.65 8.75 12.5V10C8.75 9.85 8.85 9.75 9 9.75H10.5V8.25C10.5 8.1 10.6 8 10.75 8H13.25C13.4 8 13.5 8.1 13.5 8.25V9.75H15C15.15 9.75 15.25 9.85 15.25 10V12.5C15.25 12.65 15.15 12.75 15 12.75Z" fill="white"/>
    </svg>
  </span>
);

export const XDCIcon = () => (
  <span className="wallet-icon xdc-icon">XDC</span>
);

export const USDCoinIcon = () => (
  <span className="crypto-icon usdc-icon">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#2775CA"/>
      <path d="M15.75 11.25C15.6 9.9 14.55 9.3 13.2 9.15V7.5H12.15V9.15C11.85 9.15 11.55 9.15 11.25 9.15V7.5H10.2V9.15H8.55V9.15H7.5V10.35C7.5 10.35 8.25 10.35 8.25 10.35C8.55 10.35 8.7 10.5 8.7 10.8V13.95C8.7 14.1 8.55 14.4 8.25 14.4H7.5L7.5 15.6H10.05V17.25H11.1V15.6H12.15V17.25H13.2V15.6C15 15.45 16.05 14.85 16.05 13.05C16.2 11.7 15.75 11.25 15.75 11.25ZM9.75 10.2C10.2 10.2 13.05 9.9 13.05 11.7C13.05 13.35 10.2 13.2 9.75 13.2V10.2ZM13.5 14.55C13.05 14.55 9.75 14.85 9.75 12.9C9.75 11.1 13.05 11.4 13.5 11.4V14.55Z" fill="white"/>
    </svg>
  </span>
);

export const USDTIcon = () => (
  <span className="crypto-icon usdt-icon">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#26A17B"/>
      <path d="M12 5.25V9.5M16.5 7.75H7.5M14.75 11.25H9.25M17.25 9.5V10.75C17.25 11.5 16 12 12 12C8 12 6.75 11.5 6.75 10.75V9.5M12 12V18" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </span>
);