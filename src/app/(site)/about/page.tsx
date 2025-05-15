/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
        </div>{" "}
        <Link
          href="/"
          className="text-skin-secondary hover:text-skin-base font-medium"
        >
          Home
        </Link>
      </header>
      <section className="animate-fade mx-auto mt-16 max-w-xl">
        <h1 className="text-skin-base mb-6 max-w-lg text-4xl font-medium">
          About
        </h1>
        <p className="text-skin-base">
          Gunjo (formerly Morpho) is an open-source{" "}
          <Link
            href="https://bsky.social/about"
            className="underline underline-offset-2"
          >
            Bluesky
          </Link>{" "}
          client for the web, built using{" "}
          <Link
            href="https://nextjs.org/"
            className="underline underline-offset-2"
          >
            Next.js
          </Link>
          . Similar to the official Bluesky app, it uses the{" "}
          <Link
            href="https://atproto.com/"
            className="underline underline-offset-2"
          >
            AT Protocol
          </Link>
          , a decentralized networking technology for social media. This is
          similar to Twitter apps such as Twitterrific or Tweetbot that used
          Twitter's API in the past. Gunjo was forked from{" "}
          <Link
            href="https://github.com/pdelfan/ouranos"
            className="underline underline-offset-2"
          >
            Ouranos
          </Link>
          , another Bluesky web client.
        </p>

        <p className="text-skin-base mt-3">
          And the app, Gunjo, is being developed by us,{" "}
          <Link
            href="https://foundation.gunjo.org"
            className="underline underline-offset-2"
          >
            Gunjo Foundation
          </Link>
          .
        </p>

        <h2 className="text-skin-base mb-6 mt-12 text-2xl font-medium">
          Frequently Asked Questions
        </h2>

        <h3 className="text-skin-base mb-1 text-lg font-semibold">
          Is anything stored on your servers?
        </h3>
        <p className="text-skin-base">
          Nothing from Bluesky is stored, every request goes through the
          official Bluesky servers. When you log in, your session is stored
          using cookies on your web browser. Any extra feature that exists (or
          will be added) stores information{" "}
          <Link
            href="https://javascript.info/localstorage"
            className="underline underline-offset-2"
          >
            locally
          </Link>{" "}
          on your web browser.
        </p>

        <p className="text-skin-base mt-3">
          Note: When you visit the site,{" "}
          <Link
            href="https://vercel.com/analytics"
            className="underline underline-offset-2"
          >
            Vercel Analytics
          </Link>{" "}
          is used to gather anonymized information to help me get a general idea
          and provide better support. These include number of visitors, top
          visited pages, countries, operating systems, and web browsers. No
          cookies and nothing personal is collected that can be linked back to
          you. If you are using an ad blocker, tracking is likely disabled.
        </p>

        <h3 className="text-skin-base mb-1 mt-6 text-lg font-semibold">
          Why do you recommend using an app password to log in?
        </h3>
        <p className="text-skin-base">
          App passwords allow you to log in and use the app, but restrict
          third-party clients (ex. Gunjo) from certain functionalities such as
          account deletion or generating additional app passwords.
        </p>

        <h3 className="text-skin-base mb-1 mt-6 text-lg font-semibold">
          How can I provide feedback?
        </h3>
        <p className="text-skin-base">
          If you have an account on GitHub, you can go to the project's{" "}
          <Link
            href="https://github.com/gunjo-org/morpho"
            className="underline underline-offset-2"
          >
            repository
          </Link>{" "}
          and create an issue with a provided label (feature request, bug,
          question, etc). For general questions and anything that else that
          comes to your mind, there is{" "}
          <Link
            href="https://github.com/gunjo-org/morpho/discussions"
            className="underline underline-offset-2"
          >
            Discussions
          </Link>
          . If you are not on GitHub, you can also{" "}
          <Link
            href="https://bsky.app/profile/foundation.gunjo.org"
            className="underline underline-offset-2"
          >
            mention us on Bluesky
          </Link>
          .
        </p>

      </section>
      <footer className="text-skin-tertiary mt-16 text-center text-sm font-medium">
        &copy; {new Date().getFullYear()} <Link href="https://foundation.gunjo.org">Gunjo Foundation, Inc.</Link>
      </footer>
    </main>
  );
}
