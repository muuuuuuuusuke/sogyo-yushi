/**
 * 借入返済の計算。すべて標準的な金融数学で、制度への依存はない。
 *
 * 金利は利用者入力にしている。公庫の基準利率は改定が頻繁で、
 * サイトに固定値を書くと必ず古くなるため。制度の事実（限度額・期間）だけを
 * SOURCES に持ち、金利は「ご自身の見積もりを入れてください」で通す。
 */

export interface ScheduleRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanResult {
  monthlyFirst: number;
  monthlyLast: number;
  totalPayment: number;
  totalInterest: number;
  schedule: ScheduleRow[];
}

/** 元利均等: 毎月の支払額が一定。序盤は利息の割合が大きい。 */
export function equalPayment(
  principal: number,
  annualRatePct: number,
  months: number,
): LoanResult {
  const r = annualRatePct / 100 / 12;
  const pay =
    r === 0 ? principal / months : (principal * r) / (1 - (1 + r) ** -months);
  const schedule: ScheduleRow[] = [];
  let balance = principal;
  let totalInterest = 0;
  for (let m = 1; m <= months; m += 1) {
    const interest = balance * r;
    const principalPart = Math.min(pay - interest, balance);
    balance -= principalPart;
    totalInterest += interest;
    schedule.push({
      month: m,
      payment: pay,
      principal: principalPart,
      interest,
      balance: Math.max(balance, 0),
    });
  }
  return {
    monthlyFirst: pay,
    monthlyLast: pay,
    totalPayment: principal + totalInterest,
    totalInterest,
    schedule,
  };
}

/** 元金均等: 毎月の元金返済が一定。支払額は逓減し、総利息は元利均等より少ない。 */
export function equalPrincipal(
  principal: number,
  annualRatePct: number,
  months: number,
): LoanResult {
  const r = annualRatePct / 100 / 12;
  const principalPart = principal / months;
  const schedule: ScheduleRow[] = [];
  let balance = principal;
  let totalInterest = 0;
  for (let m = 1; m <= months; m += 1) {
    const interest = balance * r;
    balance -= principalPart;
    totalInterest += interest;
    schedule.push({
      month: m,
      payment: principalPart + interest,
      principal: principalPart,
      interest,
      balance: Math.max(balance, 0),
    });
  }
  return {
    monthlyFirst: schedule[0].payment,
    monthlyLast: schedule[schedule.length - 1].payment,
    totalPayment: principal + totalInterest,
    totalInterest,
    schedule,
  };
}

/**
 * 据置期間（利息のみ支払う期間）付きの元利均等。
 * 公庫の創業融資では据置を付けるのが一般的なので、ツールでも扱う。
 */
export function withGrace(
  principal: number,
  annualRatePct: number,
  months: number,
  graceMonths: number,
): LoanResult {
  const r = annualRatePct / 100 / 12;
  const graceInterest = principal * r * graceMonths;
  const rest = equalPayment(principal, annualRatePct, months - graceMonths);
  const schedule: ScheduleRow[] = [];
  for (let m = 1; m <= graceMonths; m += 1) {
    schedule.push({
      month: m,
      payment: principal * r,
      principal: 0,
      interest: principal * r,
      balance: principal,
    });
  }
  for (const row of rest.schedule) {
    schedule.push({ ...row, month: row.month + graceMonths });
  }
  return {
    monthlyFirst: graceMonths > 0 ? principal * r : rest.monthlyFirst,
    monthlyLast: rest.monthlyLast,
    totalPayment: rest.totalPayment + graceInterest,
    totalInterest: rest.totalInterest + graceInterest,
    schedule,
  };
}

export function yen(v: number): string {
  return `${Math.round(v).toLocaleString("ja-JP")}円`;
}

export function man(v: number): string {
  return `${(v / 10_000).toLocaleString("ja-JP", { maximumFractionDigits: 1 })}万円`;
}

/**
 * 制度の事実。金額・期間は法令ではなく公庫の制度要綱なので、
 * 確認日を明記して掲載する。金利はここに持たない（変動が速すぎる）。
 */
export const SOURCES = {
  checkedOn: "2026-08-02",
  items: [
    {
      label: "新規開業・スタートアップ支援資金（日本政策金融公庫）",
      note: "融資限度額7,200万円（うち運転資金4,800万円）。返済期間は設備資金20年以内・運転資金10年以内。2024年4月の制度改定で、旧・新創業融資制度の自己資金要件は撤廃された（審査で自己資金が考慮されなくなったという意味ではない）。",
    },
    {
      label: "信用保証協会の制度融資",
      note: "都道府県・市区町村が金融機関・保証協会と組む融資。条件は自治体ごとに異なるため、開業地の自治体の商工担当窓口で確認する。",
    },
  ],
};
