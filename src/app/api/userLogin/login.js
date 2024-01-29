const makeLoginRequest = async (email, password) => {
  try {
    const url = `https://micuenta.somoselagua.com.ar/micuenta/oauth/token`;

    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);
    body.append("grant_type", "password");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa("micuentaApp:mobeus"),
      },
      body: body,
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      return data;
    } else {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error en la solicitud: ${error.message}`);
  }
};