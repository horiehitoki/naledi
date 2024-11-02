import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardHeader } from "../ui/card";

export const UserCard = ({ data }: { data: unknown }) => {
  return (
    <Card key={data.cid}>
      <CardHeader>
        <a href={`/home/user?handle=${data.handle}`}>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={data.avatar} alt={data.displayName} />
              <AvatarFallback>
                {data.displayName?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{data.displayName}</p>
              <p className="text-sm text-muted-foreground">@{data.handle}</p>
            </div>
          </div>
        </a>
      </CardHeader>
    </Card>
  );
};
