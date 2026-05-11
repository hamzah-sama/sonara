import Image from "next/image";
import Link from "next/link";

export const SidebarLogo = () => {
  return (
      <Link href="/">
        <Image
          src="/logo-only.png"
          alt="Sonara logo"
          width={32}
          height={32}
          className="group-data-[collapsible=icon]:block hidden"
        />
        <Image
          src="/logo-text.png"
          alt="Sonara logo"
          width={72}
          height={72}
          className="group-data-[collapsible=icon]:hidden"
        />
      </Link>
  );
};
