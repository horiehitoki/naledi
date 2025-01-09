import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "../ui/badge";

export default function Profile({ profile }: { profile: ProfileView }) {
  return (
    <Card>
      <div>
        {profile.banner! && (
          <div className="h-48">
            <img
              src={profile.banner as string}
              className="w-full object-cover h-48"
              alt="banner"
            />
          </div>
        )}

        <Avatar className="w-24 h-24 shadow-lg m-6">
          <AvatarImage src={profile.avatar} />
          <AvatarFallback>
            {profile.displayName?.[0]?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
      </div>

      <CardContent className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {profile.displayName}
          </h1>

          <div className="items-center space-x-2 text-muted-foreground mt-1">
            <span>@{profile.handle}</span>
            <Badge variant="secondary" className="text-xs">
              {profile.did}
            </Badge>
          </div>
        </div>

        {profile.description && (
          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {profile.description}
          </p>
        )}

        <div className="flex space-x-6 pt-2">
          <div className="flex items-center space-x-2">
            <a href={`/user/${profile.did}/follow`}>
              <span className="font-semibold">
                {profile.followsCount as string}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                フォロー
              </span>
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <a href={`/user/${profile.did}/follower`}>
              <span className="font-semibold">
                {profile.followersCount as string}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                フォロワー
              </span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
