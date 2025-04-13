import { useState, type ReactNode } from "react";

export const Swipeable = ({
  children,
  handleSwipe,
  className,
}: {
  children: ReactNode;
  handleSwipe: (direction: "Right" | "Left") => void;
  className?: string;
}) => {
  const [touchStart, setTouchStart] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const [touchEnd, setTouchEnd] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    setTouchStart(undefined);
    setTouchEnd(undefined);
    if (Math.abs(deltaY) > 50) return;
    if (Math.abs(deltaX) < 50) return;
    if (deltaX > 0) {
      handleSwipe("Left");
      return;
    }
    if (deltaX < 0) {
      handleSwipe("Right");
      return;
    }
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };
  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};
