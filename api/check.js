export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send("");
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

        if (!response.ok) {
            // treat blocked pages as empty
            return res.status(200).send("");
        }

        const html = await response.text();
        res.status(200).send(html);

    } catch (err) {
        console.error("Fetch error:", err.message);
        res.status(200).send("");
    }
}
