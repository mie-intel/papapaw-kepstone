import axios from "axios";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://solanum-agrotech-paw-be.vercel.app/";

export default axios;
