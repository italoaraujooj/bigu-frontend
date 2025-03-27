import clsx from "clsx";
import Lottie, { AnimationItem } from "lottie-web";
import { useEffect, useRef } from "react";

interface LottieProps {
  data: object;
  loop?: boolean;
  className?: string;
}

const LottieAnimation = ({
  data,
  loop = true,
  className = "",
}: LottieProps) => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: AnimationItem | undefined;

    if (animationRef.current) {
      anim = Lottie.loadAnimation({
        container: animationRef.current,
        renderer: "svg",
        loop,
        autoplay: true,
        animationData: data,
      });
    }

    return () => {
      anim?.destroy();
    };
  }, [data, loop]);

  return <div ref={animationRef} className={clsx(className)} />;
};

export default LottieAnimation;
