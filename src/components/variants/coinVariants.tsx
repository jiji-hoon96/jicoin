export const coinVariants = {
    start: (direction: boolean) => ({
      x: direction ? -300 : 300,
      opacity: 0,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exit: (direction: boolean) => ({
      x: direction ? 300 : -300,
  
      opacity: 0,
    }),
  };