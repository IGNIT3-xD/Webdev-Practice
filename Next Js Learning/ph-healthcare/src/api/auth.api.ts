import apiClient from "@/lib/apiClient";

 interface UserLoginPayload {
  email: string;
  password: string;
}

export function userLogin(payload: UserLoginPayload) {
  return apiClient("/api/v1/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function getMe() {
  return apiClient("/api/v1/auth/me")
}
