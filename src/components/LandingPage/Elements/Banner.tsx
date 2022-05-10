import React, { memo } from "react";

import nlwBanner from "../../../assets/nlw_banner.svg";

const Banner: React.FC = () => {
  return (
    <div
      style={{ backgroundImage: `url(${nlwBanner})` }}
      className="h-[40vh] bg-cover bg-center border-b-2 border-b-zinc-800 shadow-lg"
    />
  );
};

export const MemoBanner = memo(Banner);
