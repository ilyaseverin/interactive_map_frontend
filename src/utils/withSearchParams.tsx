"use client";

import { Suspense, ComponentType, ReactNode } from "react";

interface WithSearchParamsOptions {
  fallback?: ReactNode;
}

const defaultFallback = (
  <div className="min-h-screen bg-[#F1F2F3] flex items-center justify-center">
    <div className="text-base md:text-xl text-gray-600">Загрузка...</div>
  </div>
);

/**
 * HOC для автоматического оборачивания компонентов с useSearchParams в Suspense
 * @param Component - компонент, который использует useSearchParams
 * @param options - опции для настройки fallback
 * @returns компонент, обернутый в Suspense
 */
export function withSearchParams<P extends object>(
  Component: ComponentType<P>,
  options: WithSearchParamsOptions = {}
) {
  const { fallback = defaultFallback } = options;

  function WrappedComponent(props: P) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  }

  WrappedComponent.displayName = `withSearchParams(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
}

