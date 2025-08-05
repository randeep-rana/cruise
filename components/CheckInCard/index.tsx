import { CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CheckInCardProps {
  ferry: string
  route: string
  passengers: string
  departure: string
  boardingTime: string
  gateCloses: string
  onDownload?: () => void
  containerClassName?: string
}

const CheckInCard: React.FC<CheckInCardProps> = ({
  ferry,
  route,
  passengers,
  departure,
  boardingTime,
  gateCloses,
  onDownload,
  containerClassName,
}) => {
  return (
    <Card className={cn("mx-auto max-w-xl p-6 text-center shadow-lg", containerClassName)}>
      <div className="mb-4 flex justify-center">
        <CheckCircle2 className="text-green-600 size-10" />
      </div>

      <h2 className="text-blue-900 text-2xl font-semibold">You’re Checked In!</h2>
      <p className="text-muted-foreground mt-1 text-sm">Your check-in is complete. Your boarding pass is now ready.</p>

      <CardContent className="mt-6 p-0">
        <div className="text-muted-foreground grid grid-cols-2 gap-4 text-left text-sm sm:grid-cols-3">
          <div>
            <p className="text-foreground font-medium">Ferry</p>
            <p>{ferry}</p>
          </div>
          <div>
            <p className="text-foreground font-medium">Route</p>
            <p>{route}</p>
          </div>
          <div>
            <p className="text-foreground font-medium">Passengers</p>
            <p>{passengers}</p>
          </div>
          <div>
            <p className="text-foreground font-medium">Departure</p>
            <p>{departure}</p>
          </div>
          <div>
            <p className="text-foreground font-medium">Boarding Time</p>
            <p>{boardingTime}</p>
          </div>
          <div>
            <p className="text-foreground font-medium">Gate Closes</p>
            <p>{gateCloses}</p>
          </div>
        </div>

        <Button className="mt-6 w-full" onClick={onDownload}>
          DOWNLOAD BOARDING PASS
        </Button>
      </CardContent>
    </Card>
  )
}

export default CheckInCard
