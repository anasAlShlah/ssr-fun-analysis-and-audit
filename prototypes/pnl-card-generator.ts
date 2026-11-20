/**
 * Zero-Dependency SVG/Canvas Social PnL Card Generator for SSR.FUN
 * Author: Anas Al Shlah (@anasAlShlah)
 * 
 * Generates crisp 1200x630 OpenGraph / Twitter Cards for reserve trades directly in the browser.
 */

export interface PnLCardConfig {
  reserveName: string;
  reserveSymbol: string;
  entryPriceUsd: number;
  currentPriceUsd: number;
  pnlPercentage: number;
  pnlUsd: number;
  traderAddress: string;
  timestamp: string;
}

export class PnLCardGenerator {
  /**
   * Generates a standards-compliant SVG vector string for social sharing.
   */
  public static generateSvgCard(config: PnLCardConfig): string {
    const isProfit = config.pnlPercentage >= 0;
    const accentColor = isProfit ? '#10B981' : '#EF4444';
    const bgGradientStart = isProfit ? '#064E3B' : '#7F1D1D';
    const pnlSign = isProfit ? '+' : '';

    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="60%" stop-color="#020617"/>
      <stop offset="100%" stop-color="${bgGradientStart}"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="15" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Grid overlay -->
  <path d="M0 100 H1200 M0 200 H1200 M0 300 H1200 M0 400 H1200 M0 500 H1200" stroke="#1E293B" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/>
  <path d="M200 0 V630 M400 0 V630 M600 0 V630 M800 0 V630 M1000 0 V630" stroke="#1E293B" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/>

  <!-- SSR.FUN Branding -->
  <text x="80" y="90" font-family="Inter, sans-serif" font-weight="900" font-size="34" fill="#F8FAFC" letter-spacing="1">SSR.FUN</text>
  <text x="235" y="90" font-family="Inter, sans-serif" font-weight="500" font-size="20" fill="#94A3B8">| Strategic Super Reserve</text>

  <!-- Reserve Details -->
  <text x="80" y="190" font-family="Inter, sans-serif" font-weight="700" font-size="44" fill="#F8FAFC">${config.reserveName}</text>
  <rect x="80" y="215" width="120" height="34" rx="17" fill="#1E293B"/>
  <text x="140" y="238" font-family="monospace" font-weight="700" font-size="18" fill="#38BDF8" text-anchor="middle">$${config.reserveSymbol}</text>

  <!-- Giant PnL percentage -->
  <text x="80" y="380" font-family="Inter, sans-serif" font-weight="900" font-size="110" fill="${accentColor}" filter="url(#glow)">${pnlSign}${config.pnlPercentage.toFixed(2)}%</text>
  <text x="80" y="440" font-family="Inter, sans-serif" font-weight="600" font-size="28" fill="${accentColor}">(${pnlSign}$${config.pnlUsd.toLocaleString()})</text>

  <!-- Metrics row -->
  <text x="80" y="530" font-family="Inter, sans-serif" font-weight="500" font-size="16" fill="#64748B">ENTRY PRICE</text>
  <text x="80" y="560" font-family="Inter, sans-serif" font-weight="700" font-size="24" fill="#F8FAFC">$${config.entryPriceUsd.toFixed(2)}</text>

  <text x="320" y="530" font-family="Inter, sans-serif" font-weight="500" font-size="16" fill="#64748B">CURRENT PRICE</text>
  <text x="320" y="560" font-family="Inter, sans-serif" font-weight="700" font-size="24" fill="#F8FAFC">$${config.currentPriceUsd.toFixed(2)}</text>

  <text x="600" y="530" font-family="Inter, sans-serif" font-weight="500" font-size="16" fill="#64748B">TRADER</text>
  <text x="600" y="560" font-family="monospace" font-weight="600" font-size="20" fill="#94A3B8">${config.traderAddress.slice(0, 4)}...${config.traderAddress.slice(-4)}</text>

  <text x="1120" y="570" font-family="Inter, sans-serif" font-weight="500" font-size="16" fill="#475569" text-anchor="end">${config.timestamp}</text>
</svg>`;
  }
}
