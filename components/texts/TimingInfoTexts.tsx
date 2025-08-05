import { timingInfoData } from "./timing-info-data"

const TimingInfoTexts = () => {
  return timingInfoData ? <div dangerouslySetInnerHTML={{ __html: timingInfoData }} /> : <div />
}

export default TimingInfoTexts
