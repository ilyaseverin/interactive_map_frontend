"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ExpandingSearchProps {
  isOpen: boolean;
  onClose: () => void;
  searchButtonRef:
    | React.RefObject<HTMLButtonElement | null>
    | React.RefObject<HTMLButtonElement>;
}

export default function ExpandingSearch({
  isOpen,
  onClose,
  searchButtonRef,
}: ExpandingSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Небольшая задержка для плавной анимации
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, searchButtonRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}&page=1`);
      onClose();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`absolute top-1/2 -translate-y-1/2 z-[100] transition-all duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-0 pointer-events-none"
      }`}
      style={{
        left: "calc(49px + 14px)",
        right: "calc(27px + 14px)",
        width: isOpen ? "auto" : "0px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        transformOrigin: "right center",
      }}
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          {/* Поле ввода с фоном как в макете */}
          <div className="bg-[#d9d9d9] rounded-[18px] h-[34px] flex items-center">
            <div className="flex items-center gap-[3px] pl-[11px] flex-1">
              {/* Иконка поиска */}
              <div className="w-[26px] h-[26px] flex-shrink-0 flex items-center justify-center">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[12px] h-[12px]"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="#8b8b8b"
                    strokeWidth="2"
                  />
                  <path
                    d="m21 21-4.35-4.35"
                    stroke="#8b8b8b"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* Input поле */}
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введите запрос"
                className="flex-1 bg-transparent text-[10px] font-normal font-montserrat text-black placeholder:text-[#8b8b8b] focus:outline-none pr-[11px]"
                style={{ lineHeight: "normal" }}
                enterKeyHint="search"
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (query.trim()) {
                      router.push(
                        `/search?q=${encodeURIComponent(query.trim())}&page=1`
                      );
                      onClose();
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
