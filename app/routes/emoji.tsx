import { Outlet, Link, useLocation } from "@remix-run/react";
import { ListIcon, UploadIcon } from "lucide-react";
import Main from "~/components/layout/main";

export default function EmojiSettings() {
  const location = useLocation();

  const tabs = [
    {
      path: "/emoji/list",
      label: "Bluemojiの管理",
      icon: ListIcon,
    },
    {
      path: "/emoji/upload",
      label: "アップロード",
      icon: UploadIcon,
    },
  ];

  return (
    <Main>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-6">Bluemoji設定</h1>

        <div className="flex space-x-2 mb-6">
          {tabs.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`
                flex items-center px-4 py-2 rounded-lg flex-1 
                justify-center transition-colors
                ${
                  location.pathname === path
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : ""
                }
              `}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Link>
          ))}
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </Main>
  );
}
