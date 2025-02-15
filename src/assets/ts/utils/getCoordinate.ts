export const getMouseCoordinates = (e: MouseEvent) => {
  e.preventDefault();

  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -(e.clientY / window.innerHeight) * 2 + 1;

  return { x, y };
};