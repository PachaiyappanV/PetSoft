import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type Props = {
  actionType: "add" | "edit";
};

const PetFormButton = ({ actionType }: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="mt-5 self-end" disabled={pending}>
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
};

export default PetFormButton;
