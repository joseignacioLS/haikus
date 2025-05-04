import { useState, type ReactElement } from "react";

export const Swipeable = ({
  children,
  handleSwipe,
  className,
  threshold = 50,
}: {
  children: ReactElement;
  handleSwipe: (direction: "Right" | "Left" | "Up" | "Down") => void;
  className?: string;
  threshold?: number;
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
    if (Math.abs(deltaY) > threshold && Math.abs(deltaX) > threshold) return;
    if (deltaX > threshold) {
      handleSwipe("Left");
      return;
    }
    if (deltaX < -threshold) {
      handleSwipe("Right");
      return;
    }
    if (deltaY > threshold) {
      handleSwipe("Up");
      return;
    }
    if (deltaY < -threshold) {
      handleSwipe("Down");
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
