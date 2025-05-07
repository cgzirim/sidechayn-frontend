// components/inputs/DateInput.js
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-input.css"; // optional: custom styles for dark mode

const DateInput = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <div className="mb-4">
      <label className="text-white text-[17px] mb-1 block">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            className="w-full px-3 py-2 rounded-md bg-[#222] text-white border border-[#444]"
            placeholderText="Select release date"
          />
        )}
      />
    </div>
  );
};

export default DateInput;
