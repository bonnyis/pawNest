import {} from "react";
import type { SearchOptions } from "@/shared/types/data-types";

type SelectProps = {
  options: SearchOptions[];
  changeEvt: (val: string) => void;
};

const Select = ({ options, changeEvt }: SelectProps) => {
  return (
    <select
      name="searchOption"
      id="searchOption"
      onChange={(e) => {
        console.log(e);
        changeEvt(e.target.value);
      }}
      className="border w-32 h-auto p-2 rounded-md"
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
