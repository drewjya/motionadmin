export default function () {
  return {
    login() {
      return encodeURI("/auth/login");
    },
    refresh() {
      return encodeURI("/auth/refresh");
    },
    getGallery(page: number, limit: number) {
      return encodeURI(`/gallery?page=${page}&limit=${limit}`);
    },
    postGallery() {
      return encodeURI(`/gallery`);
    },
    getProduct(page: number, limit: number) {
      return encodeURI(`/product?page=${page}&limit=${limit}`);
    },
    postProduct() {
      return encodeURI(`/product`);
    },
    getCategory(page: number, limit: number) {
      return encodeURI(`/category?page=${page}&limit=${limit}`);
    },
    postCategory() {
      return encodeURI(`/category`);
    },
    getBannerProduct() {
      return encodeURI(`/banner-product`);
    },
    postBannerProduct() {
      return encodeURI(`/banner-product`);
    },
    getGalleryDisplayed() {
      return encodeURI(`/gallery-displayed`);
    },
    postGalleryDisplayed() {
      return encodeURI(`/gallery-displayed`);
    },
    getNews(page: number, limit: number) {
      return encodeURI(`/news?page=${page}&limit=${limit}`);
    },
    postNews() {
      return encodeURI("/news");
    },
    getAbout() {
      return encodeURI("/about");
    },
    postAbout() {
      return encodeURI("/about");
    },
  };
}
