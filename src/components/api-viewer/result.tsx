import React from "react";
import { Textarea } from "../ui/textarea";

export const Result = ({ promise }: { promise: Promise<unknown> | null }) => {
  const data = promise !== null ? React.use(promise) : null;
  console.log("Result data:", data);
  return (
    <Textarea
      className="min-h-[140px] font-mono resize-y"
      id="response"
      placeholder="Response will appear here..."
      readOnly
      value={data ? JSON.stringify(data, null, 2) : ""}
    />
  );
};
