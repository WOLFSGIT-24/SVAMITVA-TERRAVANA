import { forwardRef, type ImgHTMLAttributes } from 'react';

const FALLBACK_IMAGE_URL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F8F6F1'/%3E%3C/svg%3E";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, onError, ...props }, ref) => {
    if (!src) {
      return <div data-empty-image {...(props as React.HTMLAttributes<HTMLDivElement>)} />;
    }

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      (e.target as HTMLImageElement).src = FALLBACK_IMAGE_URL;
      onError?.(e);
    };

    return <img ref={ref} src={src} onError={handleError} {...props} />;
  }
);
Image.displayName = 'Image';
