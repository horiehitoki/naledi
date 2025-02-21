import UserPostsConatiner from "@/containers/posts/UserPostsContainer";

interface Props {
  params: {
    handle: string;
  };
}

export default async function Page(props: Props) {
  const { handle } = props.params;

  return <UserPostsConatiner mode="reactions" handle={handle} />;
}
