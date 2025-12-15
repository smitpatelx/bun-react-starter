import React, { Suspense } from "react";
import { SpxFetch } from "@/lib";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Form } from "./form";
import { Result } from "./result";

export const ApiViewerView = () => {
  const [promise, setPromise] = React.useState<Promise<unknown> | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const endpoint = formData.get("endpoint") as string;
    const url = new URL(endpoint, location.href);
    const method = formData.get("method") as string;
    setPromise(SpxFetch[method.toLowerCase() as keyof typeof SpxFetch](url.pathname));
  };

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Form onSubmit={handleFormSubmit} />

          <Suspense fallback={<Skeleton className="h-35 w-full" />}>
            <Result promise={promise} />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
};
