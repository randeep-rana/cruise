import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { H3 } from "../ui/typography"

interface BaggageRulesCardProps {
  rules: string[]
  title?: string
  titleClassName?: string
  listContainerClassName?: string
}

export const BaggageRulesCard: React.FC<BaggageRulesCardProps> = ({ rules, title = "Baggage Rules", titleClassName, listContainerClassName }) => {
  return (
    <Card className="border-teal-600 m-4 w-[396px] max-w-sm rounded-md border bg-[#B3EAF4] p-4 text-sm">
      <CardContent>
        <H3 className={cn("mb-3 mt-0 text-xl font-bold text-teal-900", titleClassName)}>{title}</H3>
        <ul className={cn("ml-6 list-outside list-disc space-y-1 text-base font-normal text-teal-900", listContainerClassName)}>
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
