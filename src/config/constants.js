export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://hyeonalbum-server.herokuapp.com"
    : "http://localhost:8080";
