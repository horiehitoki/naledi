import {
  Form,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
  useSearchParams,
} from "@remix-run/react";
import Main from "~/components/layout/main";
import Search from "~/components/timeline/search";
import NotFound from "~/components/ui/404";
import Alert from "~/components/ui/alert";
import { Input } from "~/components/ui/input";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("query");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("query");
    if (searchQuery) {
      navigate(`?query=${encodeURIComponent(searchQuery.toString())}`);
    }
  };

  return (
    <Main>
      <Form onSubmit={handleSubmit} className="mb-8">
        <Input
          type="text"
          name="query"
          defaultValue={currentQuery ?? ""}
          placeholder="キーワードを入力..."
          className="my-12"
        />
      </Form>

      {currentQuery ? <Search query={currentQuery} /> : ""}
    </Main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      {isRouteErrorResponse(error) ? (
        error.status === 404 ? (
          <NotFound />
        ) : (
          <Alert message="検索に失敗しました。" />
        )
      ) : (
        <Alert message="検索に失敗しました。" />
      )}
    </div>
  );
}
