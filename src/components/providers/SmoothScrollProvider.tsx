import { ReactLenis } from '@studio-freight/react-lenis';

interface SmoothScrollProviderProps {
  children: any;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothTouch: true,
  };

  return (
    // @ts-ignore
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollProvider;
