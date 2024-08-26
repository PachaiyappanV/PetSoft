import { PlusIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { Button } from "./ui/button";

type Props = {
  actionType: string;
  children: ReactNode;
};

const PetButton = ({ actionType, children }: Props) => {
  if (actionType === "add") {
    return (
      <Button size="icon">
        <PlusIcon className="h-6 w-6" />
      </Button>
    );
  }

  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "checkout") {
    return <Button variant="secondary">{children}</Button>;
  }
};
export default PetButton;
