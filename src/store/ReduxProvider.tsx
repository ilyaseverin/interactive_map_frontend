"use client";

import { PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { AppStore } from "./index";
import { makeStore } from "./index";

export function ReduxProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }

  return <Provider store={storeRef.current as AppStore}>{children}</Provider>;
}
