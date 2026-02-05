export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ status: 400, html: "" });
    }

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
                    "AppleWebKit/537.36 (KHTML, like Gecko) " +
                    "Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html"
            },
            redirect: "follow"
        });

        const html = response.ok ? await response.text() : "";

        return res.status(200).json({
            status: response.status,
            html
        });

    } catch (err) {
        console.error("Fetch error:", err.message);
        return res.status(200).json({
            status: 0,
            html: ""
        });
    }
}
