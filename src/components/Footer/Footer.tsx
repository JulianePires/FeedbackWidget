import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-center mt-auto h-10 gap-1 dark:bg-zinc-900 text-xs text-neutral-400">
      Landing Page desenvolvida por{" "}
      <a
        className="underline underline-offset-2"
        href="https://github.com/JulianePires"
        aria-label="Github profile"
      >
        Juliane Pires
      </a>{" "}
      durante a NLW Return
    </footer>
  );
};
