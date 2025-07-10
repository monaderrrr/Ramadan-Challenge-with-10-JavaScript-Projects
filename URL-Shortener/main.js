// main.js

async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const apiUrl = "https://api-ssl.bitly.com/v4/shorten";

    if (!longUrl) {
        alert("Please Enter A URL.");
        return;
    }

    const headers = {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
    };

    const data = {
        long_url: longUrl
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Error shortening URL");

        document.getElementById("shortUrl").value = result.link;
    } catch (error) {
        alert("Error: " + error.message);
    }
}

function copyToClipboard() {
    const shortenUrlInput = document.getElementById("shortUrl");

    if (!shortenUrlInput.value) {
        alert("No Shortened URL to Copy.");
        return;
    }

    shortenUrlInput.select();
    document.execCommand("copy");
    alert("Shortened URL Copied to Clipboard");
}
