import Link from "next/link";
import { Home, Search, PlusSquare, User, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-2 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Instagram className="h-8 w-8" />
          <span className="text-xl font-semibold hidden md:inline">
            InstaClone
          </span>
        </Link>
        <div className="flex-1 max-w-xs mx-4 hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-1 px-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        <div className="flex space-x-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Home className="h-6 w-6" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 md:hidden"
          >
            <Search className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <PlusSquare className="h-6 w-6" />
          </Button>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <User className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
