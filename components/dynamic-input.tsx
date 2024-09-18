"use client";

import React, { Dispatch, useRef, useEffect, SetStateAction } from "react";

type PropTypes = {
  tags: string[];
  addTag: (text: string, index: number) => void;
  removeTag: (index: number) => void;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
};

export default function DynamicInput({
  tags,
  addTag,
  removeTag,
  selectedIndex,
  setSelectedIndex,
}: PropTypes) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedIndex, tags]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const inputValue = e.currentTarget.value;

    if (inputValue.trim() !== "") {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag(inputValue, index);
        e.currentTarget.value = "";
      }
    } else {
      if (e.key === "Backspace" && selectedIndex > 0) {
        e.preventDefault();
        removeTag(selectedIndex - 1);
      } else if (e.key === "ArrowLeft" && selectedIndex > 0) {
        e.preventDefault();
        setSelectedIndex(selectedIndex - 1);
      } else if (e.key === "ArrowRight" && selectedIndex < tags.length) {
        e.preventDefault();
        setSelectedIndex(selectedIndex + 1);
      }
    }
  };

  return (
    <div className="border-2 border-gray-300 bg-transparent p-2 flex items-center gap-y-2 flex-wrap w-full rounded-lg text-gray-300 text-lg">
      {tags.map((tag, index) => (
        <div className="flex flex-row flex-wrap" key={index}>
          <input
            ref={index === selectedIndex ? inputRef : undefined}
            type="text"
            className={`outline-none px-1 bg-transparent ${
              index === selectedIndex ? "field-sizing" : "w-0"
            }`}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => setSelectedIndex(index)}
          />
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full border-2 border-gray-300 bg-transparent`}
          >
            <span className="pr-0.5">{tag}</span>
            <button
              className="hover:text-gray-500 transition duration-200"
              onClick={() => removeTag(index)}
            >
              &times;
            </button>
          </div>
        </div>
      ))}
      <input
        ref={selectedIndex === tags.length ? inputRef : undefined}
        className="outline-none px-1 my-2 bg-transparent flex-1"
        type="text"
        onKeyDown={(e) => handleKeyDown(e, tags.length)}
        onClick={() => setSelectedIndex(tags.length)}
        placeholder="Type and press Enter"
      />
    </div>
  );
}
