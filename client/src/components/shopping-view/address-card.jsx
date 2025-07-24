// import { Button } from "../ui/button";
// import { Card, CardContent, CardFooter } from "../ui/card";
// import { Label } from "../ui/label";

// function AddressCard({
//   addressInfo,
//   handleDeleteAddress,
//   handleEditAddress,
//   setCurrentSelectedAddress,
//   selectedId,
// }) {
//   return (
//     <Card
//       onClick={
//         setCurrentSelectedAddress
//           ? () => setCurrentSelectedAddress(addressInfo)
//           : null
//       }
//       className={`cursor-pointer border-red-700 ${
//         selectedId?._id === addressInfo?._id
//           ? "border-red-900 border-[4px]"
//           : "border-black"
//       }`}
//     >
//       <CardContent className="grid p-4 gap-4">
//         <Label>Address: {addressInfo?.address}</Label>
//         <Label>City: {addressInfo?.city}</Label>
//         <Label>Pincode: {addressInfo?.pincode}</Label>
//         <Label>Phone: {addressInfo?.phone}</Label>
//         <Label>Notes: {addressInfo?.notes}</Label>
//       </CardContent>
//       <CardFooter className="p-3 flex justify-between">
//         <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
//         <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
//       </CardFooter>
//     </Card>
//   );
// }

// export default AddressCard;


import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`transition-all duration-300 cursor-pointer rounded-xl border-2 shadow-sm hover:shadow-md ${
        isSelected ? "border-red-600 bg-red-50" : "border-muted"
      }`}
    >
      <CardContent className="p-4 space-y-2 text-sm md:text-base">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <Label className="text-muted-foreground w-[90px] shrink-0">Address:</Label>
          <span className="font-medium">{addressInfo?.address}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <Label className="text-muted-foreground w-[90px] shrink-0">City:</Label>
          <span className="font-medium">{addressInfo?.city}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <Label className="text-muted-foreground w-[90px] shrink-0">Pincode:</Label>
          <span className="font-medium">{addressInfo?.pincode}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <Label className="text-muted-foreground w-[90px] shrink-0">Phone:</Label>
          <span className="font-medium">{addressInfo?.phone}</span>
        </div>

        {addressInfo?.notes && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <Label className="text-muted-foreground w-[90px] shrink-0">Notes:</Label>
            <span className="font-medium">{addressInfo?.notes}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-2 flex flex-col sm:flex-row sm:justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
          className="w-full sm:w-auto"
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
          className="w-full sm:w-auto"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;


