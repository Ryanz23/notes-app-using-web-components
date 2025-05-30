export async function fetchApi(endpoint, method = "GET", body = null) {
  const baseUrl = "https://notes-api.dicoding.dev/v2/";
  const url = `${baseUrl}${endpoint}`;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}