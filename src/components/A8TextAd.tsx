/**
 * A8.net のテキスト広告。
 *
 * ステマ規制（景表法・2023年10月〜）対応として、リンクの直前に「広告」を
 * 明示する。リンクには rel="sponsored nofollow" を必ず付ける。
 * img はA8の成果計測用インプレッションビーコン（素材コードの一部）。
 */
export function A8TextAd({
  href,
  beacon,
  label,
  description,
}: {
  href: string;
  beacon: string;
  label: string;
  description: string;
}) {
  return (
    <aside className="my-6 border border-line bg-paper-raised px-4 py-4">
      <p className="label">広告（アフィリエイトリンク）</p>
      <p className="mt-2 text-sm leading-6">
        <a
          href={href}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="font-bold text-navy underline underline-offset-2"
        >
          {label}
        </a>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={beacon} width={1} height={1} alt="" className="inline" />
      </p>
      <p className="mt-1.5 text-xs leading-5 text-ink-faint">{description}</p>
    </aside>
  );
}

/** アクト・ウィル（運送業向けビジネスローン）。サイトID 007 用の素材。 */
export const ACT_WILL = {
  href: "https://px.a8.net/svt/ejp?a8mat=4B9X1A+UD99E+5KPA+NTJWY",
  beacon: "https://www19.a8.net/0.gif?a8mat=4B9X1A+UD99E+5KPA+NTJWY",
  label: "運送業特化×最短60分審査！即日融資対応の事業資金ビジネスローン【アクト・ウィル株式会社】",
  description:
    "運送業の事業者向けに特化したビジネスローンです。業種が合わない場合は対象外なのでご注意ください。金利・条件は必ず公式サイトでご確認を。",
} as const;
