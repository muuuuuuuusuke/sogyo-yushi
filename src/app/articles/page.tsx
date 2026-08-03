import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "創業融資・返済計画・つなぎ資金についての解説記事です。",
};

const ARTICLES = [
  { slug: "sogyo-yushi-erabikata", title: "創業融資の3つの経路（公庫・制度融資・民間）", lead: "どこから借りるかで金利も審査も違う。あたる順番の定石。" },
  { slug: "hensai-futan", title: "毎月の返済額は月商の何%までにすべきか", lead: "返済負担率の考え方と、据置期間の使いどころ。" },
  { slug: "tsunagi-shikin", title: "売掛金はあるのに現金がない時の選択肢", lead: "ファクタリング・ビジネスローンの仕組みと費用、注意点。" },
];

export default function ArticlesIndex() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-16">
      <h1 className="display text-[clamp(1.65rem,5vw,2.4rem)]">記事一覧</h1>
      <ul className="mt-8 border-t border-line">
        {ARTICLES.map((a) => (
          <li key={a.slug} className="border-b border-line">
            <Link href={`/articles/${a.slug}`} className="block py-4 transition-colors hover:text-navy">
              <span className="display block text-lg">{a.title}</span>
              <span className="mt-1 block text-xs leading-6 text-ink-soft">{a.lead}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
