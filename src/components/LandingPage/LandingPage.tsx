import React, { memo } from "react";
import { Footer } from "../Footer/Footer";
import { Banner, GithubButton } from "./Elements";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Banner />
      </header>

      <section className="flex flex-col items-center">
        <h1 className="text-2xl py-4 text-zinc-200 font-medium">
          Bem vinde ao Feedback Widget!
        </h1>

        <GithubButton />
      </section>

      <Footer />
    </div>
  );
};

export const MemoLandingPage = memo(LandingPage);
