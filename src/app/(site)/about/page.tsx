/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { HiSparkles } from "react-icons/hi";

export default function Page() {
  return (
    <main className="mx-auto mt-0 p-5 md:mt-16">
      <header className="mx-auto flex max-w-xl items-center justify-between animate-fade">
        <div className="flex items-center gap-6 group">
          <h1 className="font-bold text-3xl flex">
            <span className="bg-gradient-to-r from-blue-800 to-indigo-900 inline-block text-transparent bg-clip-text">
              Stellar
            </span>

            <HiSparkles className="text-yellow-400 ml-2" />
          </h1>
        </div>

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
          Stellar is an open-source{" "}
          <Link
            href="https://blueskyweb.xyz/"
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
            href="https://blueskyweb.xyz/"
            className="underline underline-offset-2"
          >
            AT Protocol
          </Link>
          , a decentralized networking technology for social media. Stellar was
          forked from{" "}
          <Link
            href="https://github.com/pdelfan/ouranos"
            className="underline underline-offset-2"
          >
            Ouranos
          </Link>
          , another Bluesky web client.
        </p>

        <p className="text-skin-base mt-3">
          What sets Stellar apart is its unique Bluemoji reaction feature,
          allowing users to express themselves with a wide variety of custom
          emoji reactions beyond the standard options available in other
          clients.
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

        <h3 className="text-skin-base mb-1 mt-6 text-lg font-semibold">
          Why do you recommend using an app password to log in?
        </h3>
        <p className="text-skin-base">
          App passwords allow you to log in and use the app, but restrict
          third-party clients (ex. Stellar) from certain functionalities such as
          account deletion or generating additional app passwords.
        </p>
        <h3 className="text-skin-base mb-1 mt-6 text-lg font-semibold">
          How do Bluemoji reactions work?
        </h3>
        <p className="text-skin-base">
          Bluemoji is a common record for representing emojis on ATProto.
          Reactions are saved in the user's PDS in a form that links posts and
          emojis, and are cached and displayed in AppView.
        </p>

        <h3 className="text-skin-base mb-1 mt-6 text-lg font-semibold">
          How can I provide feedback?
        </h3>
        <p className="text-skin-base">
          If you have an account on GitHub, you can go to the project's
          repository and create an issue with a provided label (feature request,
          bug, question, etc). For general questions and anything else that
          comes to your mind, there are Discussions available. You can also
          mention us on Bluesky.
        </p>
      </section>
      <footer className="text-skin-tertiary mt-16 text-center text-sm font-medium">
        Stellar · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
