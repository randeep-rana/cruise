import { cn } from "@/lib/utils"

export function H1({ children, className = "" }) {
  return <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}>{children}</h1>
}

export function H2({ children, className = "" }) {
  return (
    <h2 className={cn("mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors", className)}>
      {children}
    </h2>
  )
}

export function H3({ children, className = "" }) {
  return <h3 className={cn("mt-8 scroll-m-20 text-2xl font-semibold tracking-tight", className)}>{children}</h3>
}

export function H4({ children, className = "" }) {
  return <h4 className={cn("mt-8 scroll-m-20 text-xl font-semibold tracking-tight", className)}>{children}</h4>
}

export function P({ children, className = "" }) {
  return <p className={cn(`text-base leading-7 text-writing [&:not(:first-child)]:mt-6 ${className}`)}>{children}</p>
}

export function List({ children, className = "" }) {
  return <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>{children}</ul>
}

export function Lead({ children, className = "" }) {
  return <p className={cn("text-xl font-semibold text-slate-700", className)}>{children}</p>
}

export function Blockquote({ children, className = "" }) {
  return <blockquote className="mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800">{children}</blockquote>
}

export function Code({ children, className = "" }) {
  return <code className="relative rounded bg-slate-100 py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold text-slate-900">{children}</code>
}

export function Large({ children, className = "" }) {
  return <div className="text-lg font-semibold text-slate-900">{children}</div>
}

export function Small({ children, className = "" }) {
  return <div className={cn("text-sm font-medium leading-none", className)}>{children}</div>
}

export function Subtle({ children, className = "" }) {
  return <div className={`text-sm text-slate-500 ${className}`}>{children}</div>
}
