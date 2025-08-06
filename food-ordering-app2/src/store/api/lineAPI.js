import liff from "@line/liff";

export async function initLine() {
  try {
    await liff.init({ liffId: "YOUR_LIFF_ID" });
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  } catch (error) {
    console.error("LIFF Initialization failed", error);
  }
}

export function getProfile() {
  return liff.getProfile();
}
