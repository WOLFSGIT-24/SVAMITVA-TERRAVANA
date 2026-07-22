import { create } from 'zustand';

export const DEFAULT_CURRENCY = 'INR';

export function formatPrice(amount: number, currencyCode: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  } catch {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: DEFAULT_CURRENCY,
    }).format(amount);
  }
}

interface CurrencyState {
  currency: string | null;
  isLoading: boolean;
  error: string | null;
}

const useCurrencyStore = create<CurrencyState>(() => ({
  currency: DEFAULT_CURRENCY,
  isLoading: false,
  error: null,
}));

export const useCurrency = () => {
  const { currency, isLoading, error } = useCurrencyStore();
  return { currency, isLoading, error };
};
