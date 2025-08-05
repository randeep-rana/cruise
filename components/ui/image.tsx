/* eslint-disable @next/next/no-img-element */
import * as React from "react"

import { cn } from "@/lib/utils"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(({ className, alt, loading = "lazy", ...props }, ref) => {
  return <img className={cn(className)} ref={ref} alt={alt} {...props} loading={loading} />
})
Image.displayName = "Image"

export { Image }
