import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const SITE_URL = "https://sogyo-yushi.vercel.app";
const SITE_NAME = "創業融資の返済シミュレーター";
const DESCRIPTION =
  "創業融資をいくら借りると、毎月いくら返すことになるのか。元利均等・元金均等・据置期間に対応した返済シミュレーターと、" +
  "日本政策金融公庫の創業融資制度の事実だけを整理したガイドです。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "創業融資の返済シミュレーター｜毎月の返済額と総利息を計算",
    template: `%s｜${SITE_NAME}`,
  },
  description: DESCRIPTION,
  // Search Console の所有権確認。トークンは Google アカウント単位。
  verification: {
    google: "KPe0iMIzhr19t3Ml_nAZBxmRBeS5A_svFCPMSfH3Tv4",
  },
  openGraph: {
    title: SITE_NAME,
    description: DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <header className="border-b border-line bg-paper-raised">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-3.5">
            <Link href="/" className="display text-sm hover:text-navy">
              創業融資の返済シミュレーター
            </Link>
            <Link
              href="/articles"
              className="text-xs text-ink-soft transition-colors hover:text-navy"
            >
              記事
            </Link>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="mt-16 border-t border-line">
          <div className="mx-auto w-full max-w-3xl px-5 py-8 text-xs leading-6 text-ink-faint">
            <p>
              本サイトの計算は一般的な金融計算式によるもので、融資の可否や条件を保証するものではありません。
              金利・審査条件は金融機関にご確認ください。
            </p>
            <p className="mt-3">
              <Link href="/articles" className="hover:text-ink">記事</Link>
              <span className="mx-2">|</span>
              <Link href="/about" className="hover:text-ink">このサイトについて</Link>
              <span className="mx-2">|</span>
              <Link href="/privacy" className="hover:text-ink">プライバシーポリシー</Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
