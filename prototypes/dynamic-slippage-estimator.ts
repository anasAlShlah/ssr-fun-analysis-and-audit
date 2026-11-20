/**
 * Dynamic Multi-Asset Slippage Estimator for SSR.FUN
 * Author: Anas Al Shlah (@anasAlShlah)
 * 
 * Computes optimal, risk-adjusted slippage tolerance for tokenized reserves
 * containing multiple heterogeneous constituents (crypto + tokenized stocks).
 */

export interface ReserveConstituent {
  ticker: string;
  weightPct: number;          // e.g. 25.0 for 25%
  liquidityUsd: number;       // Pool depth in USD
  volatility24hPct: number;   // 24h price volatility percentage
  isRwaStock: boolean;        // True if tokenized equity/ETF
}

export interface SlippageRecommendation {
  recommendedSlippageBps: number; // In basis points (100 bps = 1.0%)
  minSlippageBps: number;
  maxSlippageBps: number;
  estimatedPriceImpactPct: number;
  warnings: string[];
}

export class DynamicSlippageEngine {
  private static readonly BASE_SLIPPAGE_BPS = 50; // 0.5% default floor

  /**
   * Calculates the weighted slippage tolerance for a basket rebalance or trade.
   */
  public static calculateOptimalSlippage(
    tradeAmountUsd: number,
    constituents: ReserveConstituent[]
  ): SlippageRecommendation {
    const warnings: string[] = [];
    let weightedImpactSum = 0;
    let weightedVolatilitySum = 0;

    for (const c of constituents) {
      const allocationUsd = tradeAmountUsd * (c.weightPct / 100);
      
      // Marginal price impact heuristic = (trade size / available liquidity) * 100
      const constituentImpact = c.liquidityUsd > 0 
        ? (allocationUsd / c.liquidityUsd) * 100 
        : 5.0; // conservative fallback if zero liquidity reported

      if (constituentImpact > 2.5) {
        warnings.push(`High price impact expected for ${c.ticker} (${constituentImpact.toFixed(2)}%)`);
      }

      weightedImpactSum += constituentImpact * (c.weightPct / 100);
      weightedVolatilitySum += c.volatility24hPct * (c.weightPct / 100);
    }

    // Dynamic formula: Base + Weighted Impact + (Volatility Factor * 15 bps)
    const impactBps = Math.round(weightedImpactSum * 100);
    const volAdjustmentBps = Math.round(weightedVolatilitySum * 15);
    const rawRecommendedBps = this.BASE_SLIPPAGE_BPS + impactBps + volAdjustmentBps;

    // Safety guardrails: Min 30 bps (0.3%), Max 500 bps (5.0%)
    const recommendedSlippageBps = Math.max(30, Math.min(500, rawRecommendedBps));

    return {
      recommendedSlippageBps,
      minSlippageBps: Math.max(20, Math.round(recommendedSlippageBps * 0.7)),
      maxSlippageBps: Math.min(800, Math.round(recommendedSlippageBps * 1.5)),
      estimatedPriceImpactPct: Number(weightedImpactSum.toFixed(3)),
      warnings
    };
  }
}
