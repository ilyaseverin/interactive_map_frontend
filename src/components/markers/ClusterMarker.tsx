import React from "react";

interface ClusterMarkerProps {
  pointCount: number;
  totalPoints: number;
  onClick: () => void;
  size?: "small" | "medium" | "large";
}

const ClusterMarker: React.FC<ClusterMarkerProps> = ({
  pointCount,
  totalPoints,
  onClick,
  size = "medium",
}) => {
  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-12 h-12 text-sm",
    large: "w-16 h-16 text-base",
  };

  // Вычисляем размер кластера на основе количества точек
  const clusterSize = Math.min(30 + (pointCount / totalPoints) * 40, 70);
  const dynamicSize = `${clusterSize}px`;

  return (
    <div
      className="cursor-pointer transform transition-all duration-200 hover:scale-110"
      onClick={onClick}
    >
      <div
        className={`flex items-center justify-center rounded-full bg-blue-500 text-white font-bold shadow-lg border-4 border-white ${sizeClasses[size]}`}
        style={{
          width: dynamicSize,
          height: dynamicSize,
        }}
      >
        {pointCount}
      </div>
    </div>
  );
};

export default ClusterMarker;
