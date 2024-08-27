import { PlusIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { Button } from "./ui/button";

type Props = {
  actionType: "add" | "edit" | "checkout";
  children?: ReactNode;
  onClick?: () => void;
};

const PetButton = ({ actionType, children, onClick }: Props) => {
  if (actionType === "add") {
    return (
      <Button size="icon">
        <PlusIcon className="h-5 w-5" />
      </Button>
    );
  }

  if (actionType === "edit") {
    return <Button variant="secondary">{children}</Button>;
  }

  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }
};
export default PetButton;
