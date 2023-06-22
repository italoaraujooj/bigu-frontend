import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import clsx from 'clsx';
// import animationData from '../../assets/ghost.json';

const LottieAnimation = ({ data, loop = true, className = "" }: any) => {
  const animationRef = useRef(null);

  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: animationRef.current,
      renderer: 'svg',
      loop: loop,
      autoplay: true,
      animationData: data,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return <div ref={animationRef} className={clsx(className)} />;
};

export default LottieAnimation;
