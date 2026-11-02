import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Pelajari Akar Masalah Kemampuan Literasi · Rapor Pendidikan",
  description:
    "Pelajari akar masalah dari Kemampuan Literasi satuan pendidikan Anda dan temukan inspirasi cara membenahinya.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
