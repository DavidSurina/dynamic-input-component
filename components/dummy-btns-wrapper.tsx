"use client";

import { useState } from "react";
import DynamicInput from "@/components/dynamic-input";

const customTagList = [
  "React",
  "Next.js",
  "Tailwind",
  "JavaScript",
  "CSS",
  "html",
  "GraphQL",
];

export default function DummyBtnsWrapper() {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const addTag = (text: string, index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 0, text);
    setTags(newTags);
    setSelectedIndex((prevState) => prevState + 1);
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
    if (selectedIndex > 0 && index < selectedIndex) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  console.log(selectedIndex);
  return (
    <>
      <DynamicInput
        tags={tags}
        addTag={addTag}
        removeTag={removeTag}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <div className="flex flex-row flex-wrap gap-5 mt-10 text-lg text-gray-400">
        {customTagList.map((tag) => (
          <button
            type="button"
            className="min-w-[80px] rounded-lg border-2 border-gray-300 bg-transparent p-2 hover:text-gray-300 transition duration-200"
            key={tag}
            onClick={() => {
              addTag(tag, selectedIndex);
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </>
  );
}
