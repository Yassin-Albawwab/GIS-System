import StatusIndicator from "@/Components/StatusIndicator";
import React from "react";

export default function CategorySwitch({ status }) {
  switch (status) {
    case "F":
      return <StatusIndicator color="bg-red-400" label="Felony" />;
    case "M":
      return <StatusIndicator color="bg-cyan-500" label="Misdemeanor" />;
    case "V":
      return <StatusIndicator color="bg-green-300" label="Violation" />;
  }
}
