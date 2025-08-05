import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ConvenienceFeesAccordion({ priceObj, title }) {
  return (
    <Accordion type="single" collapsible className="convenienceFeesAccordion w-[inherit]">
      <AccordionItem value={title} className="m-0 border-b-0 p-0 shadow-none">
        <AccordionTrigger className="w-full py-0">
          {title}
          {/* ₹ {priceObj.convenienceFees + priceObj.convenienceFeeTax} */}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col">
            <div className="convenienceFeesAccordionRow flex justify-between">
              <p>Fee</p>
              <p>₹ {priceObj.convenienceFees}</p>
            </div>
            <div className="convenienceFeesAccordionRow flex justify-between">
              <p>GST</p>
              <p>₹ {priceObj.convenienceFeeTax}</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
