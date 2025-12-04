import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const Form = ({ onSubmit }: { onSubmit: React.FormEventHandler<HTMLFormElement> }) => {
  return (
    <form
      className="flex items-center gap-2"
      onSubmit={onSubmit}
    >
      <Label
        className="sr-only"
        htmlFor="method"
      >
        Method
      </Label>
      <Select
        defaultValue="GET"
        name="method"
      >
        <SelectTrigger
          className="w-[100px]"
          id="method"
        >
          <SelectValue placeholder="Method" />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectItem value="GET">GET</SelectItem>
          <SelectItem value="PUT">PUT</SelectItem>
        </SelectContent>
      </Select>
      <Label
        className="sr-only"
        htmlFor="endpoint"
      >
        Endpoint
      </Label>
      <Input
        defaultValue="/api/hello"
        id="endpoint"
        name="endpoint"
        placeholder="/api/hello"
        type="text"
      />
      <Button
        type="submit"
        variant="secondary"
      >
        Send
      </Button>
    </form>
  );
};
