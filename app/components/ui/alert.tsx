import { TriangleAlertIcon } from "lucide-react";
import Main from "../layout/main";

export default function Alert({ message }: { message: string }) {
  return (
    <Main>
      <TriangleAlertIcon size={64} className="m-auto my-12" />
      <h1 className="text-2xl font-bold text-center">{message}</h1>
    </Main>
  );
}
