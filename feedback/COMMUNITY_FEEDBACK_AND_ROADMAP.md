# SSR.FUN Product Feedback & Feature Roadmap

**Submitted by:** Anas Al Shlah ([@anasAlShlah](https://github.com/anasAlShlah))  
**For:** Core Engineering & Product Team @ Strategic Super Reserve

---

## 1. Direct Feedback Submitted via In-App Widget

> **Summary:** *"SSR.FUN demonstrates an exceptionally clean interface for multi-asset reserves on Solana. To drive mainstream adoption, the platform needs: 1) One-click social PnL share cards with live Solscan verification badges, 2) Constituent rebalance alerts pushed directly via Telegram/Discord webhooks, and 3) Dynamic slippage guards to prevent trade reverts on illiquid tokenized stock legs. Overall UI is responsive, fast, and visually compelling."*

---

## 2. Top 5 Recommended Roadmap Features

### 1. High-DPI Canvas PnL Card Generator
Enable reserve creators and traders to generate crisp 1200x630 social preview cards for X (Twitter) directly on the client side using WebGL or HTML5 2D Canvas without backend server latency. *(Reference implementation in `prototypes/pnl-card-generator.ts`)*.

### 2. On-Chain Copy-Trading Vaults
Allow new users to delegate capital into a top-performing Reserve Manager's vault with non-custodial profit-share smart contracts (e.g., 80% to investor, 20% to reserve architect).

### 3. Integrated Jupiter Swap V6 Routing
Ensure the reserve minting/burning engine natively integrates Jupiter's Ultra API routing for best execution across Orca, Raydium, and Meteora DLMM pools.

### 4. Real-World Asset (RWA) Market Hours Indicator
Since 800+ tokenized equities (e.g. AAPL, NVDA, SPY) trade under traditional market opening/closing windows, include a clear indicator on ticker cards displaying whether the underlying traditional equity market is Open or in After-Hours trading.

### 5. Mobile PWA & Offline Portfolio Cache
Implement a Service Worker with IndexedDB caching (Offline-First architecture) allowing users to inspect their reserve allocations, historical performance, and thesis notes even during intermittent mobile network connectivity.
