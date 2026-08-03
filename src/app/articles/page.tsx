import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "記事",
  description: "創業融資・返済計画・つなぎ資金についての解説記事です。",
};

const ARTICLES = [
  { slug: "sogyo-yushi-erabikata", title: "創業融資の3つの経路（公庫・制度融資・民間）", lead: "どこから借りるかで金利も審査も違う。あたる順番の定石。" },
  { slug: "hensai-futan", title: "毎月の返済額は月商の何%までにすべきか", lead: "返済負担率の考え方と、据置期間の使いどころ。" },
  { slug: "tsunagi-shikin", title: "売掛金はあるのに現金がない時の選択肢", lead: "ファクタリング・ビジネスローンの仕組みと費用、注意点。" },
];

/** 記事の図版。帳票の線画で内容を図にする: 経路=三本の道、負担率=ゲージ、つなぎ=橋。 */
function Thumb({ slug }: { slug: string }) {
  const stroke = "var(--ink)";
  const navy = "var(--navy)";
  return (
    <svg viewBox="0 0 160 100" className="h-[100px] w-40 shrink-0 border border-line" aria-hidden>
      <rect width="160" height="100" fill="var(--paper-raised)" />
      {slug === "sogyo-yushi-erabikata" && (
        <g fill="none" strokeWidth="2">
          <path d="M30 84V30" stroke={navy} strokeWidth="3" />
          <path d="M80 84V44" stroke={stroke} />
          <path d="M130 84V58" stroke={stroke} strokeWidth="1.5" />
          <text x="24" y="22" fontSize="11" fontWeight="bold" fill={navy}>1</text>
          <text x="75" y="37" fontSize="11" fill={stroke}>2</text>
          <text x="125" y="51" fontSize="11" fill={stroke}>3</text>
        </g>
      )}
      {slug === "hensai-futan" && (
        <g fill="none" strokeWidth="2">
          <rect x="24" y="42" width="112" height="18" stroke={stroke} />
          <rect x="24" y="42" width="34" height="18" fill={navy} stroke="none" />
          <path d="M58 34v34M80 34v34" stroke="var(--warn)" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="50" y="28" fontSize="10" fill="var(--warn)">5%</text>
          <text x="73" y="28" fontSize="10" fill="var(--warn)">10%</text>
        </g>
      )}
      {slug === "tsunagi-shikin" && (
        <g fill="none" strokeWidth="2">
          <path d="M20 70h36v14M104 84V70h36" stroke={stroke} />
          <path d="M56 70C70 46 90 46 104 70" stroke={navy} strokeWidth="2.5" />
          <text x="66" y="88" fontSize="10" fill={stroke}>入金まで</text>
        </g>
      )}
    </svg>
  );
}

export default function ArticlesIndex() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
      <h1 className="display text-[clamp(1.65rem,5vw,2.4rem)]">記事</h1>
      <ul className="!ml-0 mt-8 list-none space-y-5">
        {ARTICLES.map((a) => (
          <li key={a.slug} className="!ml-0 !list-none">
            <Link href={`/articles/${a.slug}`} className="!no-underline flex items-center gap-5 transition-colors hover:text-navy">
              <Thumb slug={a.slug} />
              <span>
                <span className="display block text-lg leading-7">{a.title}</span>
                <span className="mt-1 block text-xs leading-6 text-ink-soft">{a.lead}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
