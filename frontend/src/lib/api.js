import axios from "axios";

const BASE = process.env.REACT_APP_BACKEND_URL;

export const api = axios.create({
  baseURL: `${BASE}/api`,
  withCredentials: true,
});

export function formatApiError(err) {
  const detail = err?.response?.data?.detail;
  if (!detail) return err?.message || "Something went wrong";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail.map((e) => (typeof e?.msg === "string" ? e.msg : JSON.stringify(e))).join(" • ");
  }
  if (typeof detail?.msg === "string") return detail.msg;
  return String(detail);
}
