import { memo } from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

function Loader({ size = 24, className = "" }) {
  return <Loader2 className={cn("duration-2000 animate-spin ease-linear", className)} size={size} />
}

export default memo(Loader)
