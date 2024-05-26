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
      return encodeURI(`/banner`);
    },
    postBannerProduct() {
      return encodeURI(`/banner`);
    },
    getProductPromotion() {
      return encodeURI(`/product/promotion`);
    },
    
    getNews(page: number, limit: number) {
      return encodeURI(`/news?page=${page}&limit=${limit}`);
    },
    postNews() {
      return encodeURI("/news");
    },
    getAbout() {
      return encodeURI("/compro");
    },
    youtube() {
      return encodeURI("/youtube");
    },
    postAbout() {
      return encodeURI("/compro");
    },
  };
}
