import { Button } from "./ui/button";

type Props = {
  actionType: "add" | "edit";
};

const PetFormButton = ({ actionType }: Props) => {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
};

export default PetFormButton;
