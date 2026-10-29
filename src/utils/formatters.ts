/**
 * Persian number and currency formatting utilities
 */

export function toPersianDigits(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '';
  const str = String(num);
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (w) => persianDigits[+w]);
}

export function formatPrice(priceInToman: number | undefined | null): string {
  if (!priceInToman) return 'توافقی';
  
  if (priceInToman >= 1_000_000_000) {
    const billions = priceInToman / 1_000_000_000;
    const formatted = Number.isInteger(billions) ? billions.toString() : billions.toFixed(1);
    return `${toPersianDigits(formatted)} میلیارد تومان`;
  }
  
  if (priceInToman >= 1_000_000) {
    const millions = Math.round(priceInToman / 1_000_000);
    return `${toPersianDigits(millions)} میلیون تومان`;
  }
  
  return `${toPersianDigits(priceInToman.toLocaleString('fa-IR'))} تومان`;
}

export function formatRentDisplay(mortgage?: number, rent?: number): string {
  const mortStr = mortgage !== undefined ? formatPrice(mortgage) : '۰';
  const rentStr = rent !== undefined && rent > 0 ? `${formatPrice(rent)} / ماه` : 'بدون اجاره (رهن کامل)';
  return `ودیعه: ${mortStr} | اجاره: ${rentStr}`;
}

export function calculateMortgageToRent(mortgageAmount: number, ratePercentPerMillion: number = 3): number {
  // هر ۱۰۰ میلیون رهن معادل ۳ میلیون اجاره
  return Math.round((mortgageAmount / 100_000_000) * (ratePercentPerMillion * 1_000_000));
}

export function formatNumberWithCommas(num: number | string): string {
  if (!num) return '۰';
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return toPersianDigits(parts.join('.'));
}
