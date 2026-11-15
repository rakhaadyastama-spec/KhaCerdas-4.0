
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        berhasil: false,
        pesan: "Metode tidak diizinkan."
      })
    };
  }

  try {
    const alamat = process.env.APPS_SCRIPT_URL;

    if (!alamat) {
      throw new Error("Alamat database belum diatur.");
    }

    const respons = await fetch(alamat, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: event.body,
      redirect: "follow"
    });

    const hasil = await respons.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: hasil
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        berhasil: false,
        pesan: error.message
      })
    };
  }
};

