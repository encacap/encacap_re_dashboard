import { ReactNode } from "react";

interface AdminConfigWebsiteContainerProps {
  title: string;
  children: ReactNode;
}

const AdminConfigWebsiteContainer = ({ title, children }: AdminConfigWebsiteContainerProps) => {
  return (
    <div className="rounded-lg border-2 border-gray-100 px-8">
      <div className="mt-0.5 pt-5">
        <div className="font-semibold">{title}</div>
        <div className="mt-5 h-1 w-20 rounded-full bg-gray-100" />
      </div>
      <div className="py-8">{children}</div>
    </div>
  );
};

export default AdminConfigWebsiteContainer;
