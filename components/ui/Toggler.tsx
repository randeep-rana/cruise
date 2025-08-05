import React from "react"
import * as ToggleGroup from "@radix-ui/react-toggle-group"

const toggleGroupItemClasses =
  "inline-flex min-w-[80px] items-center justify-center rounded-[0.185rem] border-2 border-transparent px-3 py-1.5 text-sm font-medium text-slate-700 transition-all  disabled:pointer-events-none disabled:opacity-50 data-[state=on]:border-primary data-[state=on]:bg-white data-[state=on]:text-slate-900 data-[state=on]:shadow-sm"

const ToggleGroupDemo = ({ items, handleChange, defaultValue = null }) => {
  const customDefaultValue = defaultValue || (items.length === 1 ? items[0]?.value : undefined)
  return (
    <ToggleGroup.Root
      className="inline-flex gap-[6px] rounded bg-slateGrey py-1 px-[6px]"
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
