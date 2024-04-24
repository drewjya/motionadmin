export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth();

  const excludedRoute = {
    "/login": true,
  };
  if (to.path in excludedRoute) {
    return;
  }
  const isSuccess = await auth.refresh();
  console.log(isSuccess, "MIDDLEWARE SUCCESS");

  if (!isSuccess) {
    return navigateTo("/login");
  }
  return;
});
