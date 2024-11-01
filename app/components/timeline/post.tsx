import { PostType } from "@types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";

export const Post = ({ post }: PostType) => {
  return (
    <Card key={post.cid} className="my-5">
      <CardHeader>
        <a href={`/user?handle=${post.author.handle}`}>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={post.author.avatar}
                alt={post.author.displayName}
              />
              <AvatarFallback>
                {post.author.displayName?.[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.displayName}</p>
              <p className="text-sm text-muted-foreground">
                @{post.author.handle}
              </p>
            </div>
          </div>
        </a>
      </CardHeader>
      <CardContent>
        <p>{post.record.text}</p>
      </CardContent>
    </Card>
  );
};
