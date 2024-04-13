export const useApp = () => {
  const isActive = ref(false);
  const pages: {
    title: string;
    link: string;
  }[] = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Product",
      link: "/product",
    },
    {
      title: "Gallery",
      link: "/gallery",
    },
    {
      title: "Carousel",
      link: "/carousel",
    },
    {
      title: "Banner",
      link: "/banner",
    },
    {
      link: "/compro",
      title: "Compro",
    },
  ];

  return {
    isActive,
    pages,
    clickSidebar() {
      isActive.value = !isActive.value;
    },
    turnOffSidebar() {
      isActive.value = false;
    },
  };
};
