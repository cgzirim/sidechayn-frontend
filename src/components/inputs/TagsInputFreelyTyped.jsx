import React, { useState } from "react";
import { useController } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

const TagsInputFreelyTyped = ({ name, control, label, placeholder }) => {
  const { field } = useController({ name, control });
  const [inputValue, setInputValue] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = inputValue.trim();
      if (tag && !field.value.includes(tag)) {
        field.onChange([...field.value, tag]);
        setInputValue("");
      }
    }
  };

  const removeTag = (index) => {
    const newTags = [...field.value];
    newTags.splice(index, 1);
    field.onChange(newTags);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="text-white text-[17px] mb-1 block">{label}</label>
      )}

      <div className="flex flex-wrap items-center gap-2 p-2 bg-[#222] rounded-md border border-[#333]">
        {field.value.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#333] text-white text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 text-xs text-gray-400 hover:text-red-500"
            >
              <FaTimes />
            </button>
          </div>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addTag}
          placeholder={placeholder || "Enter tag and press Enter"}
          className="bg-transparent border-none outline-none text-white placeholder:text-gray-500 text-sm flex-1"
        />
      </div>
    </div>
  );
};

export default TagsInputFreelyTyped;
