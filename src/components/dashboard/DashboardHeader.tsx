import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, User, Settings, LogOut } from "lucide-react";

interface DashboardHeaderProps {
  merchantName?: string;
  logoUrl?: string;
  isDarkMode?: boolean;
  onDarkModeToggle?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
}

const DashboardHeader = ({
  merchantName = "Next Corner Plus",
  logoUrl = "https://api.dicebear.com/7.x/initials/svg?seed=NC",
  isDarkMode = false,
  onDarkModeToggle = () => {},
  onSettingsClick = () => {},
  onLogout = () => {},
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-3">
        <img
          src={logoUrl}
          alt="Merchant Logo"
          className="h-8 w-8 rounded-full"
        />
        <h1 className="font-semibold text-lg">{merchantName}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDarkModeToggle}
          className="h-9 w-9"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
