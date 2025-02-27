import Image from "next/image";
import Link from "next/link";
import { HiSparkles } from "react-icons/hi";

export default function Home() {
  return (
    <main className="mx-auto mt-0 p-5 md:mt-16">
      <header className="mx-auto flex max-w-xl items-center justify-between animate-fade">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 group">
            <h1 className="font-bold text-3xl flex">
              <span className="bg-gradient-to-r from-blue-800 to-indigo-900 inline-block text-transparent bg-clip-text">
                Stellar
              </span>

              <HiSparkles className="text-yellow-400 ml-2" />
            </h1>
          </div>
        </div>
        <Link
          href="/about"
          className="text-skin-secondary hover:text-skin-base font-medium"
        >
          About
        </Link>
      </header>
      <section className="animate-fade-up animate-delay-150 mx-auto mt-16 max-w-xl">
        <h1 className="text-skin-base max-w-lg text-4xl font-medium">
          AT Protocol web client with Bluemoji reactions
        </h1>

        <ul className="text-skin-secondary mt-5 text-lg font-medium">
          <li>Custom emoji reactions</li>
          <li>Open network</li>
          <li></li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="https://bsky.app"
            target="_blank"
            className="text-skin-base bg-skin-muted/70 hover:bg-skin-muted rounded-full px-5 py-3 font-medium"
          >
            Sign up on Bluesky
          </Link>
          <Link
            href="/login"
            className="text-skin-inverted bg-skin-inverted hover:bg-skin-inverted-muted rounded-full px-5 py-3 font-medium"
          >
            Log in
          </Link>
        </div>
      </section>
      <div className="animate-fade-up animate-delay-300 mx-auto mt-8 max-w-fit">
        <Image
          src="/images/screenshot.png"
          alt="Stellar desktop screenshot"
          width={1000}
          height={830}
          priority
        />
      </div>
      <footer className="animate-fade-up animate-delay-500 text-skin-tertiary mt-16 text-center text-sm font-medium">
        Stellar · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
