import useBreakpoint from './useBreakpoint';

const useSortedItems = (items, cardWidth) => {
  const breakpoint = useBreakpoint();
  const sortedItems = items
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, cardWidth[breakpoint]);

  return sortedItems;
};

export default useSortedItems;
