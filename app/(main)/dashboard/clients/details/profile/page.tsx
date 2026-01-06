import { Heading } from "@/components/layout/formatting";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Heading title="Personal details" />

      {/* Tags */}
      <div className="flex items-center gap-2 border rounded-lg p-4">
        <Badge>Tag 1</Badge>
        <Badge>Tag 2</Badge>
        <Badge>Tag 3</Badge>
        <Badge className="ml-auto">Commenced</Badge>
      </div>

      {/* Personal details */}
      <div className="space-y-2 border rounded-lg p-4">
        <p className="font-bold">Identity & contact details</p>
        <div className="grid grid-cols-4 grid-rows-3 gap-4 text-sm">
          <div><p className="font-bold">First name</p><p>John</p></div>
          <div><p className="font-bold">Middle name</p><p>Winston</p></div>
          <div><p className="font-bold">Last name</p><p>Smith</p></div>
          <div className="row-start-2"><p className="font-bold">Gender</p><p>Male</p></div>
          <div className="row-start-2"><p className="font-bold">Date of birth</p><p>10/03/1987</p></div>
          <div className="row-start-3"><p className="font-bold">Email address</p><p>johnsmith5678@outlook.com</p></div>
          <div className="row-start-3"><p className="font-bold">Mobile phone</p><p>0489 147 629</p></div>
          <div className="row-start-3"><p className="font-bold">Home phone</p><p>(07) 3154 8962</p></div>
          <div className="row-start-3"><p className="font-bold">Primary contact</p><p>Jenny Smith</p></div>
        </div>
      </div>

      <div className="space-y-2 border rounded-lg p-4">
        <p className="font-bold">Program details</p>
        <div className="grid grid-cols-4 grid-rows-3 gap-4 text-sm">
          <div className="col-span-1 row-span-1 col-start-1 row-start-1"><p className="font-bold">Converted from lead</p><p>24/12/2025</p></div>
          <div className="col-span-1 row-span-1 col-start-2 row-start-1"><p className="font-bold">Lead manager</p><p>Jason Monroe</p></div>
          <div className="col-span-1 row-span-1 col-start-3 row-start-1"><p className="font-bold">How the client registered</p><p>Lead conversion</p></div>
          <div className="col-span-1 row-span-1 col-start-1 row-start-2"><p className="font-bold">Referral source</p><p>Centrelink</p></div>
          <div className="col-span-1 row-span-1 col-start-2 row-start-2"><p className="font-bold">Referring organisation</p><p>MAX Employment</p></div>
          <div className="col-span-1 row-span-1 col-start-3 row-start-2"><p className="font-bold">Registered by</p><p>Matthew Carter</p></div>
          <div className="col-span-1 row-span-1 col-start-4 row-start-2"><p className="font-bold">Why choose us?</p><p>TBA</p></div>
          <div className="col-span-1 row-span-1 col-start-1 row-start-3"><p className="font-bold">Commencement date</p><p>Matthew Carter</p></div>
          <div className="col-span-1 row-span-1 col-start-2 row-start-3"><p className="font-bold">Exit date</p><p>TBA</p></div>
        </div>
      </div>

      {/* Residential address */}
      <div className="space-y-2 border rounded-lg p-4">
        <p className="font-bold">Residential address</p>
        <div className="grid grid-cols-4 text-sm">
          <div className="col-span-1"><p className="font-bold">Street address</p><p>75 Robinson Road</p></div>
          <div className="col-span-1"><p className="font-bold">City</p><p>Nundah</p></div>
          <div className="col-span-1"><p className="font-bold">State</p><p>Queensland</p></div>
          <div className="col-span-1"><p className="font-bold">Postcode</p><p>4012</p></div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <p className="font-bold">Postal address</p>
        <div className="flex text-sm gap-1">
          <p>Same as residential address?</p>
          <p className="font-bold">Yes</p>
        </div>
      </div>
    </div>
  );
}
