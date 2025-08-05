import React from "react"
import * as ToggleGroup from "@radix-ui/react-toggle-group"

const toggleGroupItemClasses =
  "inline-flex min-w-[100px] items-center border-b-2 justify-center md:border-l-2 px-3 text-sm font-medium text-gray-400 transition-all  disabled:pointer-events-none disabled:opacity-50  data-[state=on]:bg-brand-600 data-[state=on]:text-white first:rounded-l-md last:rounded-r-md focus:border-gray-white"

const ToggleGroupDemo = ({ items, handleChange, defaultValue = null, className = "" }) => {
  const customDefaultValue = defaultValue || (items.length === 1 ? items[0]?.value : undefined)
  return (
    <ToggleGroup.Root
      className="grid overflow-x-auto rounded border md:inline-flex"
      type="single"
      defaultValue={customDefaultValue}
      aria-label="Text alignment"
    >
      {items.map((item, i) => (
        <ToggleGroup.Item className={toggleGroupItemClasses} value={item.value} key={i} onClick={(e) => handleChange(item.value)}>
          {item.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}

export default ToggleGroupDemo
