import StatusIndicator from "@/Components/StatusIndicator";
import { getTrans } from "@/store/useLangStore";
import React from "react";

export default function CategorySwitch({ status }) {
  switch (status) {
    case "F":
      return <StatusIndicator color="bg-red-600" label={getTrans("felony")} />;
    case "M":
      return (
        <StatusIndicator color="bg-cyan-500" label={getTrans("misdemeanor")} />
      );
    case "V":
      return (
        <StatusIndicator color="bg-green-600" label={getTrans("violance")} />
      );
  }
}
