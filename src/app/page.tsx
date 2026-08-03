"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  SOURCES,
  equalPayment,
  equalPrincipal,
  man,
  withGrace,
  yen,
} from "@/lib/loan";

type Method = "equalPayment" | "equalPrincipal";

const AMOUNT_PRESETS = [3_000_000, 5_000_000, 7_000_000, 10_000_000];
const YEAR_PRESETS = [5, 7, 10];

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-4 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
        active
          ? "border-navy bg-navy text-white"
          : "border-line bg-paper-raised text-ink-soft hover:border-ink-faint hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export default function Home() {
  const [amount, setAmount] = useState(5_000_000);
  const [ratePct, setRatePct] = useState(2.5);
  const [years, setYears] = useState(7);
  const [graceMonths, setGraceMonths] = useState(0);
  const [method, setMethod] = useState<Method>("equalPayment");

  const months = years * 12;
  const result = useMemo(() => {
    if (amount <= 0 || months <= graceMonths) return null;
    if (graceMonths > 0) return withGrace(amount, ratePct, months, graceMonths);
    return method === "equalPayment"
      ? equalPayment(amount, ratePct, months)
      : equalPrincipal(amount, ratePct, months);
  }, [amount, ratePct, months, graceMonths, method]);

  // 年表示の返済予定表。毎月120行を見せても読めないので年で畳む。
  const yearly = useMemo(() => {
    if (!result) return [];
    const rows: { year: number; paid: number; interest: number; balance: number }[] = [];
    for (const row of result.schedule) {
      const y = Math.ceil(row.month / 12);
      if (!rows[y - 1]) rows[y - 1] = { year: y, paid: 0, interest: 0, balance: 0 };
      rows[y - 1].paid += row.payment;
      rows[y - 1].interest += row.interest;
      rows[y - 1].balance = row.balance;
    }
    return rows;
  }, [result]);

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:py-14">
      <p className="label">創業融資・借入返済の計算</p>
      <h1 className="display mt-3 text-[clamp(1.9rem,6vw,3rem)]">
        その借入、毎月いくら
        <br />
        返すことになるか
      </h1>
      <p className="mt-5 max-w-xl text-[0.8125rem] leading-7 text-ink-soft">
        創業融資は「いくら借りられるか」より
        <strong className="font-bold text-ink">「毎月いくら返すか」</strong>
        で考えるほうが安全です。売上がまだ立たない月にも、返済日は来ます。
        金利はご自身の見積もり（公庫や銀行の提示）を入れてください。
      </p>

      <section className="mt-9 border border-line bg-paper-raised px-5 py-7 sm:px-8">
        <p className="label mb-5">条件</p>
        <div className="space-y-6">
          <div>
            <label htmlFor="amount" className="mb-2 block text-sm">
              借入額
            </label>
            <div className="flex items-stretch border border-line bg-white">
              <input
                id="amount"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={amount === 0 ? "" : amount.toLocaleString("ja-JP")}
                onChange={(e) => {
                  const digits = e.target.value.replace(/[^0-9]/g, "");
                  setAmount(digits === "" ? 0 : Number(digits.slice(0, 10)));
                }}
                className="w-full bg-transparent px-3 py-2.5 text-right text-lg tabular-nums focus:outline-none"
              />
              <span className="flex items-center border-l border-line px-3 text-xs text-ink-faint">
                円
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {AMOUNT_PRESETS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(v)}
                  className={`border px-2.5 py-1 text-xs transition-colors ${
                    amount === v
                      ? "border-navy text-navy"
                      : "border-line text-ink-faint hover:border-ink-faint hover:text-ink-soft"
                  }`}
                >
                  {man(v)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="rate" className="mb-2 block text-sm">
                年利率（%）
              </label>
              <div className="flex items-stretch border border-line bg-white">
                <input
                  id="rate"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={ratePct}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/[^0-9.]/g, "");
                    const parsed = Number(cleaned);
                    setRatePct(
                      cleaned === "" || Number.isNaN(parsed)
                        ? 0
                        : Math.min(parsed, 20),
                    );
                  }}
                  className="w-full bg-transparent px-3 py-2.5 text-right text-lg tabular-nums focus:outline-none"
                />
                <span className="flex items-center border-l border-line px-3 text-xs text-ink-faint">
                  %
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-ink-faint">
                金利は金融機関・時期・条件で変わります。提示された利率を入力してください。
              </p>
            </div>

            <div>
              <span className="mb-2 block text-sm">返済期間</span>
              <div className="grid grid-cols-3 gap-px bg-line">
                {YEAR_PRESETS.map((y) => (
                  <Choice key={y} active={years === y} onClick={() => setYears(y)}>
                    {y}年
                  </Choice>
                ))}
              </div>
              <p className="mt-2 text-xs leading-5 text-ink-faint">
                公庫の運転資金は10年以内が上限です（設備資金は20年以内）。
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <span className="mb-2 block text-sm">返済方式</span>
              <div className="grid grid-cols-2 gap-px bg-line">
                <Choice
                  active={method === "equalPayment"}
                  onClick={() => setMethod("equalPayment")}
                >
                  元利均等
                </Choice>
                <Choice
                  active={method === "equalPrincipal"}
                  onClick={() => setMethod("equalPrincipal")}
                >
                  元金均等
                </Choice>
              </div>
              <p className="mt-2 text-xs leading-5 text-ink-faint">
                元利均等は毎月一定額、元金均等は最初が重く総利息は少なめ。
                据置を付けた場合は元利均等で計算します。
              </p>
            </div>

            <div>
              <span className="mb-2 block text-sm">据置期間（利息のみの期間）</span>
              <div className="grid grid-cols-4 gap-px bg-line">
                {[0, 6, 12, 24].map((g) => (
                  <Choice
                    key={g}
                    active={graceMonths === g}
                    onClick={() => setGraceMonths(g)}
                  >
                    {g === 0 ? "なし" : `${g}ヶ月`}
                  </Choice>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {result && (
        <>
          <section className="mt-10">
            <p className="label">計算結果</p>
            <div className="mt-3 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3">
              <div className="bg-paper-raised px-4 py-5">
                <p className="label">毎月の返済額{graceMonths > 0 && "（据置後）"}</p>
                <p className="figure mt-2 text-2xl text-navy">
                  {yen(result.monthlyLast === result.monthlyFirst || graceMonths > 0
                    ? result.schedule[graceMonths]?.payment ?? result.monthlyFirst
                    : result.monthlyFirst)}
                </p>
                {method === "equalPrincipal" && graceMonths === 0 && (
                  <p className="mt-1.5 text-[11px] text-ink-faint">
                    初回 {yen(result.monthlyFirst)} → 最終回 {yen(result.monthlyLast)}
                  </p>
                )}
                {graceMonths > 0 && (
                  <p className="mt-1.5 text-[11px] text-ink-faint">
                    据置中は利息のみ {yen(result.monthlyFirst)}/月
                  </p>
                )}
              </div>
              <div className="bg-paper-raised px-4 py-5">
                <p className="label">支払う利息の合計</p>
                <p className="figure mt-2 text-2xl">{yen(result.totalInterest)}</p>
                <p className="mt-1.5 text-[11px] text-ink-faint">
                  借入額の {((result.totalInterest / amount) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-paper-raised px-4 py-5">
                <p className="label">総返済額</p>
                <p className="figure mt-2 text-2xl">{yen(result.totalPayment)}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              この返済を続けるには、
              <strong className="font-bold text-ink">
                毎月 {yen((result.schedule[graceMonths]?.payment ?? result.monthlyFirst))} を、売上から人件費や仕入れを払った残りで
              </strong>
              賄い続ける必要があります。月商見込みの5〜10%を超えるなら、期間を延ばすか借入額を見直す余地があります。
            </p>
          </section>

          <section className="mt-10">
            <p className="label">年ごとの返済予定</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-ink text-left">
                    <th className="py-2 pr-3 font-bold">年</th>
                    <th className="py-2 pr-3 text-right font-bold">年間返済額</th>
                    <th className="py-2 pr-3 text-right font-bold">うち利息</th>
                    <th className="py-2 text-right font-bold">年末残高</th>
                  </tr>
                </thead>
                <tbody>
                  {yearly.map((r) => (
                    <tr key={r.year} className="border-b border-line">
                      <td className="py-2 pr-3 tabular-nums">{r.year}年目</td>
                      <td className="py-2 pr-3 text-right tabular-nums">{yen(r.paid)}</td>
                      <td className="py-2 pr-3 text-right tabular-nums text-ink-soft">
                        {yen(r.interest)}
                      </td>
                      <td className="py-2 text-right tabular-nums">{yen(r.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      <section className="mt-14">
        <p className="label">借りる前に</p>
        <ul className="mt-4 border-t border-line">
          {[
            {
              slug: "sogyo-yushi-erabikata",
              title: "創業融資の3つの経路（公庫・制度融資・民間）",
              lead: "どこから借りるかで金利も審査も違う。順番の定石を整理。",
            },
            {
              slug: "hensai-futan",
              title: "毎月の返済額は月商の何%までにすべきか",
              lead: "返済負担率の考え方と、据置期間の使いどころ。",
            },
            {
              slug: "tsunagi-shikin",
              title: "売掛金はあるのに現金がない時の選択肢",
              lead: "ファクタリング・ビジネスローンの仕組みと手数料の相場、注意点。",
            },
          ].map((a) => (
            <li key={a.slug} className="border-b border-line">
              <Link
                href={`/articles/${a.slug}`}
                className="block py-4 transition-colors hover:text-navy"
              >
                <span className="display block text-lg">{a.title}</span>
                <span className="mt-1 block text-xs leading-6 text-ink-soft">
                  {a.lead}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 text-xs leading-6 text-ink-faint">
        <p className="label mb-3">制度の事実（{SOURCES.checkedOn} 時点）</p>
        <ul className="space-y-2">
          {SOURCES.items.map((s) => (
            <li key={s.label}>
              <strong className="font-bold text-ink-soft">{s.label}</strong>：{s.note}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
