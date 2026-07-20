import ViewMapWithMarker from "@/Components/ViewMapWithMarker";
import Main from "./(home)/Main";
import Test from "./(home)/Test";
import { Suspense } from "react";
import CrimeNYC from "./(home)/CrimeNYC";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <Main /> */}
      {/* <ViewMapWithMarker /> */}
      <Suspense>
        <CrimeNYC />
      </Suspense>
    </div>
  );
}
