import type { Metadata } from "next";
import { SOURCES } from "@/lib/loan";

export const metadata: Metadata = {
  title: "このサイトについて",
  description: "計算の方法、制度情報の根拠、運営者についての情報です。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-2xl space-y-4 px-5 py-12 text-[0.8125rem] leading-7 text-ink-soft sm:py-16">
      <h1 className="display text-[clamp(1.65rem,5vw,2.4rem)] text-ink">このサイトについて</h1>

      <h2 className="display !mt-12 text-xl text-ink">何をするサイトか</h2>
      <p>
        創業融資・事業資金の借入について、
        <strong className="font-bold text-ink">毎月の返済額と総利息</strong>
        を計算するツールです。元利均等・元金均等・据置期間に対応しています。
        計算はすべて標準的な金融計算式で、閲覧者のブラウザ内で完結します。
        入力値が送信・保存されることはありません。
      </p>

      <h2 className="display !mt-12 text-xl text-ink">金利を入力式にしている理由</h2>
      <p>
        金融機関の金利は改定が頻繁で、サイトに固定値を書くと必ず古くなります。
        誤った金利で計算するくらいなら、
        ご自身が提示された利率を入れてもらうほうが正確です。
        そのため当サイトは金利の「相場」を掲載しません。
      </p>

      <h2 className="display !mt-12 text-xl text-ink">制度情報の根拠</h2>
      <p>{SOURCES.checkedOn} 時点で確認した公的機関の公表情報にもとづきます。</p>
      <ul className="space-y-1.5">
        {SOURCES.items.map((s) => (
          <li key={s.label} className="ml-5 list-disc">
            <strong className="font-bold text-ink">{s.label}</strong>：{s.note}
          </li>
        ))}
      </ul>

      <h2 className="display !mt-12 text-xl text-ink">運営者</h2>
      <p>しがないランナー（個人運営・東京都）</p>
      <p className="text-xs text-ink-faint">個人運営のため詳細な住所は非公開としています。</p>

      <h2 className="display !mt-12 text-xl text-ink">広告について</h2>
      <p>
        当サイトはアフィリエイトプログラムによる広告を掲載する場合があります。
        その場合は広告である旨をリンクの近くに明示します。
        運営者は金融商品の販売者・仲介者ではなく、特定の借入を推奨するものではありません。
      </p>

      {/* 同一運営者の開示。評価目的の相互リンクではないため、このページに限定する。 */}
      <h2 className="display !mt-12 text-xl text-ink">同じ運営者のサイト</h2>
      <ul className="space-y-1.5">
        <li className="ml-5 list-disc">
          <a href="https://setsuritsu-cost.vercel.app" className="text-navy underline underline-offset-2">会社設立の費用計算</a>
          ：資本金と会社形態から法定費用を計算するツール
        </li>
        <li className="ml-5 list-disc">
          <a href="https://circle-map.com" className="text-navy underline underline-offset-2">circle-map</a>
          ：地図上に同心円を描き、商圏や通勤圏の距離を確認できるツール
        </li>
        <li className="ml-5 list-disc">
          <a href="https://kyuyo-rank.vercel.app" className="text-navy underline underline-offset-2">医療・介護の給与相場ランキング</a>
          ：看護師・保育士・介護職などの給与相場を公的統計から見られるツール
        </li>
        <li className="ml-5 list-disc">
          <a href="https://tech-kyuyo.vercel.app" className="text-navy underline underline-offset-2">技術職の給与相場ランキング</a>
          ：エンジニア・技術職の給与相場を公的統計から見られるツール
        </li>
        <li className="ml-5 list-disc">
          <a href="https://jikka-chika.vercel.app" className="text-navy underline underline-offset-2">実家の地価</a>
          ：全国の住宅地の地価と30年の推移を市区町村別に見られるツール
        </li>
        <li className="ml-5 list-disc">
          <a href="https://animal-videos-six.vercel.app" className="text-navy underline underline-offset-2">どうぶつじゅかん</a>
          ：世界中の動物の動画を、種類別に集めた図鑑サイト
        </li>
      </ul>
    </main>
  );
}
