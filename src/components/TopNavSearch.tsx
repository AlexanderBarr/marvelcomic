import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface TopNavSearchProps {
  onSearch: (query: string) => void;
}

export function TopNavSearch({ onSearch }: TopNavSearchProps) {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleButtonClick = async () => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        onClick={handleButtonClick}
        className={`rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-800`}
      >
        Go
      </Button>
    </div>
  );
}
