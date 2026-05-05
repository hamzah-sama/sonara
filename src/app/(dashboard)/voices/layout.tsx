import { VoicesLayout } from "@/modules/voices/view/voices-layout";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <VoicesLayout>{children}</VoicesLayout>;
};

export default Layout;
