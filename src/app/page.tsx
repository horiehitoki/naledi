import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto mt-0 p-5 md:mt-16">
      <header className="mx-auto flex max-w-xl items-center justify-between animate-fade">
        <div className="flex items-center gap-3">
          <Link
            href="https://foundation.gunjo.org"
          >
            <Image
              src="/mark.svg"
              alt="gunjo logo"
              width={40}
              height={40}
            />
          </Link>
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
          Bluesky client for the web what forked from Ouranos
        </h1>
        
        <ul className="text-skin-secondary mt-5 text-lg font-medium">
          <li>Designed for simplicity</li>
          <li>Enhanced features</li>
          <li>Open-source</li>
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
      <footer className="animate-fade-up animate-delay-500 text-skin-tertiary mt-16 text-center text-sm font-medium">
        &copy; {new Date().getFullYear()} <Link href="https://foundation.gunjo.org">Gunjo Foundation, Inc.</Link>
      </footer>
    </main>
  );
}
