import React, { useEffect, useRef } from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}
const Popover = ({ trigger, content }: PopoverProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className="absolute z-10 w-48 py-2 mt-2 bg-gray-600 text-white rounded-md shadow-xl">
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
