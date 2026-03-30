export function requestOptionCreator(
  requestMethod,
  requestBody = {},
  isAuthenticationNeeded = false,
) {
  const token = "accessToken";
  const requestHeader = new Headers();
  requestHeader.append("Content-Type", "application/json");

  if (isAuthenticationNeeded) {
    requestHeader.append("Authorization", `Bearer ${token}`);
  }

  const requestOptions = {
    method: requestMethod,
    headers: requestHeader,
    redirect: "follow",
  };

  if (requestMethod !== "GET" && requestMethod !== "DELETE") {
    requestOptions["body"] = JSON.stringify(requestBody);
  }

  return requestOptions;
}

export async function requestMaker(endpoint, requestOptions) {
  try {
    const response = await fetch(endpoint, requestOptions);
    if (response.status === 401) {
      console.log("User Session Expired");
      return { isError: true, message: "User session expired." };
    }

    const data = await  response.json();

    if (response.status === 200) {
      return { isError: false, message: "Success", data };
    } else if (response.status === 201) {
      return { isError: false, message: "Object created", data };
    } else if (response.status === 400) {
      return { isError: true, message: "Error while performing action", data };
    } else if (response.status === 500) {
      return { isError: true, message: "Server error", data };
    } else {
      return {
        isError: true,
        message: `server return unexpected status: ${response.status}`,
        data,
      };
    }
  } catch (error) {
    console.error("Request failed");
    return { isError: true, message: "request failed", error };
  }
}