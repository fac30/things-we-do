// import type { NextConfig } from "next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";
import serwist from "@serwist/next";

const baseConfig = {
  // Base Next.js config
};

export default async (phase: any) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = serwist({
      swSrc: "src/app/sw.ts",
      swDest: "public/sw.js",
      maximumFileSizeToCacheInBytes: 5000000,
    });
    return withSerwist(baseConfig);
  }

  return baseConfig;
};
