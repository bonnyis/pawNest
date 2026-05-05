import {} from "react";
import type { SearchOptions } from "@/shared/types/data-types";

type SelectProps = {
  options: SearchOptions[];
  changeEvt: (val: string) => void;
  className?: string;
};

const Select = ({ options, changeEvt, className }: SelectProps) => {
  return (
    <select
      name="searchOption"
      id="searchOption"
      onChange={(e) => {
        changeEvt(e.target.value);
      }}
      className={`border h-auto p-2 rounded-md ${className ?? "w-full sm:w-32"}`}
    >
      <option value="">선택</option>
      {options &&
        options.map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          );
        })}
    </select>
  );
};

export default Select;
