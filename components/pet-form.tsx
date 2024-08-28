"use client";
import { usePetContext } from "@/lib/hooks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type Props = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

const PetForm = ({ actionType, onFormSubmission }: Props) => {
  const { handleAddPet } = usePetContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newPet = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl:
        (formData.get("imageUrl") as string) ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      age: Number(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };
    handleAddPet(newPet);
    onFormSubmission();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" name="ownerName" type="text" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">ImageUrl</Label>
          <Input id="imageUrl" name="imageUrl" type="text" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" name="notes" rows={3} />
        </div>
      </div>

      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Add a new pet" : "Edit pet"}
      </Button>
    </form>
  );
};

export default PetForm;
