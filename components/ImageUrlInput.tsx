"use client";

import { useState } from "react";

interface ImageUrlInputProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

export default function ImageUrlInput({ value, onChange }: ImageUrlInputProps) {
  const [draft, setDraft] = useState("");

  function addUrl() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    try {
      new URL(trimmed); // validate URL shape
    } catch {
      return; // silently ignore invalid URLs
    }
    onChange([...value, trimmed]);
    setDraft("");
  }

  function removeUrl(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="url"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
          placeholder="https://example.com/image.jpg"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={addUrl}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Add
        </button>
      </div>

      {value.length > 0 && (
        <ul className="space-y-1">
          {value.map((url, i) => (
            <li
              key={i}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <span className="truncate text-gray-700 flex-1 mr-2">{url}</span>
              <button
                type="button"
                onClick={() => removeUrl(i)}
                className="text-gray-400 hover:text-red-500 transition-colors text-xs font-medium shrink-0"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
