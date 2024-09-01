"use client";
import { usePetContext } from "@/lib/hooks";
import { petFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PetFormButton from "./pet-form-button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

type Props = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

const PetForm = ({ actionType, onFormSubmission }: Props) => {
  const { selectedPet, handleEditPet, handleAddPet } = usePetContext();

  type TPetForm = z.infer<typeof petFormSchema>;
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: actionType === "edit" ? selectedPet?.name : "",
      ownerName: actionType === "edit" ? selectedPet?.ownerName : "",
      imageUrl: actionType === "edit" ? selectedPet?.imageUrl : "",
      age: actionType === "edit" ? selectedPet?.age : "",
      notes: actionType === "edit" ? selectedPet?.notes : "",
    },
  });

  return (
    <form
      action={async (formData) => {
        const result = await trigger();
        if (!result) {
          return;
        }
        onFormSubmission();
        const petData = getValues();
        petData.imageUrl =
          petData.imageUrl ||
          "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png";
        if (actionType === "add") {
          handleAddPet(petData);
        }
        if (actionType === "edit") {
          handleEditPet(selectedPet!.id, petData);
        }
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">ImageUrl</Label>
          <Input id="imageUrl" {...register("imageUrl")} />
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>
      <PetFormButton actionType={actionType} />
    </form>
  );
};

export default PetForm;
