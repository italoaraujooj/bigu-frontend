import React, { ReactNode } from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  children?: ReactNode;
}

export const Avatar = ({
  src,
  alt = "avatar",
  fallback = "?",
}: AvatarProps) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
};

export const AvatarImage = ({ src, alt }: { src: string; alt?: string }) => {
  return (
    <img
      src={src}
      alt={alt || "avatar"}
      className="w-full h-full object-cover"
    />
  );
};

export const AvatarFallback = ({ children }: { children: React.ReactNode }) => {
  return <span>{children}</span>;
};
