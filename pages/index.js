import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";

import { useRouter } from "next/router";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  //const router = useRouter();
  return (
    <div>
      <p>Landing Page</p>
      <Link href="login">Login</Link>
      <Link href="signup">Signup</Link>
    </div>
  );
}
