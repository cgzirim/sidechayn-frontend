import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import useTags from "../../api/hooks/tags/useTags";

const TagsInput = ({ name, control, label }) => {
  const { field } = useController({ name, control });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: tags, isLoading } = useTags({ limit: 500 });

  const availableTags = tags ? tags.results : [];

  const addTag = (tag) => {
    console.log("TAG => ", tag);
    if (!field.value.some((t) => t.id === tag.id)) {
      field.onChange([...field.value, tag]);
    }
  };

  const removeTag = (id) => {
    field.onChange(field.value.filter((t) => t.id !== id));
  };

  return (
    <div className="mb-4 relative">
      {label && (
        <label className="text-white text-[17px] mb-1 block">{label}</label>
      )}

      <div
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex flex-wrap items-center gap-2 p-2 bg-[#222] rounded-md border border-[#333] cursor-pointer"
      >
        {field.value.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#333] text-white text-sm"
          >
            {tag.name}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag.id);
              }}
              className="ml-1 text-xs text-gray-400 hover:text-red-500"
            >
              <FaTimes />
            </button>
          </div>
        ))}
        <span className="text-sm text-gray-400">
          {field.value.length === 0 ? "Select tags..." : ""}
        </span>
      </div>

      {dropdownOpen && (
        <div className="absolute z-10 mt-1 max-h-48 overflow-y-auto w-full bg-[#1e1e1e] border border-[#333] rounded-md shadow-lg">
          {availableTags.map((tag) => {
            const alreadySelected = field.value.some((t) => t.id === tag.id);
            return (
              <div
                key={tag.id}
                onClick={() => {
                  addTag(tag);
                  setDropdownOpen(false);
                }}
                className={`px-3 py-2 text-sm text-white cursor-pointer hover:bg-[#333] ${
                  alreadySelected ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {tag.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TagsInput;
