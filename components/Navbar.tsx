'use client'

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItem({ href, text }: any) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <Link href={href} legacyBehavior>
      <a
        className={classnames(
          isActive ? "border-indigo-500 border-b-2 font-semibold" : "",
          "text-gray-900 inline-flex items-center px-1 pt-1 text-base"
        )}
      >
        {text}
      </a>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-white shadow">

    </nav>
  );
}
