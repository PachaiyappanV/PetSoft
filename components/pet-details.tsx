"use client";
import { usePetContext } from "@/lib/hooks";
import Image from "next/image";
import PetButton from "./pet-button";

export default function PetDetails() {
  const { selectedPet, handleCheckout } = usePetContext();
  return (
    <section className="flex flex-col h-full w-full">
      {!selectedPet ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-2xl font-medium">No pet selected</p>
        </div>
      ) : (
        <>
          <div className=" flex items-center bg-white px-8 py-5 border-b border-black/10 ">
            <Image
              src={selectedPet?.imageUrl}
              alt="Selected pet image"
              height={75}
              width={75}
              className="h-[75px] w-[75px] rounded-full object-cover"
            />
            <h2 className="text-3xl font-semibold leading-7 ml-5 ">
              {selectedPet?.name}
            </h2>
            <div className="ml-auto space-x-2">
              <PetButton actionType="edit">Edit</PetButton>
              <PetButton
                actionType="checkout"
                onClick={() => handleCheckout(selectedPet.id)}
              >
                Checkout
              </PetButton>
            </div>
          </div>

          <div className="flex justify-around py-10 px-5 text-center">
            <div>
              <h3 className="text-[13px] font-medium uppercase text-zinc-700">
                Owner name
              </h3>
              <p className="mt-1 text-lg text-zinc-800">
                {selectedPet?.ownerName}
              </p>
            </div>

            <div>
              <h3 className="text-[13px] font-medium uppercase text-zinc-700">
                Age
              </h3>
              <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
            </div>
          </div>

          <section
            className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border 
      border-black/10"
          >
            {selectedPet?.notes}
          </section>
        </>
      )}
    </section>
  );
}
