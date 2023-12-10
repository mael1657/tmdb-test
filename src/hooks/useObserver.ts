import { useEffect, useState } from "react";

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

export const useObserver = ({
  root,
  rootMargin = "10px",
  threshold = 0.1,
  onIntersect,
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  useEffect(() => {
    if (!target) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      {
        root,
        rootMargin,
        threshold,
      }
    );
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
};
