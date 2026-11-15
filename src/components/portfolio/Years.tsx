"use client";

import { useSyncExternalStore } from "react";
import { experienceYears, profile } from "./content";

// The site is a static export, so the server value is frozen at build time.
// These re-count in the browser so the number stays right between deploys.
const subscribe = () => () => {};
const useYears = (built: number) =>
  useSyncExternalStore(subscribe, experienceYears, () => built);

export const Years = ({ built }: { built: number }) => useYears(built);

export const Summary = ({ built }: { built: number }) =>
  profile.summary(useYears(built));
