import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "../ui/badge";
import FacetRender from "../render/facetRender";
import { RichText } from "@atproto/api";
import { useState } from "react";
import { useProfile } from "~/state/profile";
import { Button } from "../ui/button";
import { Delete, Plus } from "lucide-react";
import { useToast } from "~/hooks/use-toast";

export default function Profile({ profile }: { profile: ProfileView }) {
  const [followed, setFollowed] = useState<boolean>(
    profile.viewer?.following ? true : false
  );
  const [followUri, setFollowUri] = useState<string>(
    profile.viewer?.following ?? ""
  );

  const myProfile = useProfile();
  const { toast } = useToast();

  //ProfileのFacetを検出
  const rt = new RichText({ text: profile.description! });
  rt.detectFacetsWithoutResolution();

  async function follow() {
    setFollowed(true);

    const res = await fetch("/api/follow/", {
      method: "POST",
      body: JSON.stringify({ did: profile.did }),
    });

    const json = await res.json();

    if (json.error) {
      toast({
        title: "Error",
        description: "フォローに失敗しました。",
        variant: "destructive",
      });

      return;
    }

    setFollowUri(json.uri);
  }

  async function deleteFollow() {
    setFollowed(false);

    const res = await fetch("/api/follow/", {
      method: "DELETE",
      body: JSON.stringify({ followUri: followUri }),
    });

    const json = await res.json();

    if (json.error) {
      toast({
        title: "Error",
        description: "フォローの解除に失敗しました。",
        variant: "destructive",
      });

      return;
    }

    setFollowUri("");
  }

  if (profile)
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
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight">
                {profile.displayName}
              </h1>
              {profile.did !== myProfile!.did && (
                <div>
                  {followed ? (
                    <div>
                      <Button onClick={deleteFollow}>
                        <Delete /> フォロー解除
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button onClick={follow}>
                        <Plus /> フォロー
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="items-center space-x-2 text-muted-foreground mt-1">
              <span>@{profile.handle}</span>
              <Badge variant="secondary" className="text-xs">
                {profile.did}
              </Badge>
            </div>
          </div>

          {profile.description && (
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              <FacetRender text={profile.description} facets={rt.facets} />
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
