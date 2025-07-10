// controllers/urlController.js

import { Url } from "../models/Url.js";
import { isValidUrl } from "../utils/isValidUrl.js";
import { generateShortId } from "../utils/generateShortId.js";
import { getClientInfo } from "../utils/getClientInfo.js";
import Analytics from "../models/Analytics.js";
export const shortenUrl = async (req, res, next) => {
  try {
    const { longUrl } = req.body;

    // 1. Validate URL
    if (!isValidUrl(longUrl)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // 2. Check if URL already exists in DB
    const existing = await Url.findOne({ longUrl });
    if (existing) {
      return res.status(200).json({
        shortUrl: `${req.headers.host}/${existing.shortId}`,
        originalUrl: existing.longUrl,
      });
    }

    // 3. Generate short ID and get client info
    const shortId = generateShortId();
    const clientInfo = getClientInfo(req);

    // 4. Save to DB
    const newUrl = new Url({
      shortId,
      longUrl,
      clicks: 0,
      createdAt: new Date(),
      client: clientInfo, // optional
    });

    await newUrl.save();

    return res.status(201).json({
      shortUrl: `${req.headers.host}/${shortId}`,
      originalUrl: longUrl,
    });
  } catch (error) {
    next(error);
  }
    
};

// urlController.js

export const redirectUrl = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });

    if (!url) {
      const error = new Error("Short URL not found");
      error.statusCode = 404;
      throw error;
    }

    url.clicks += 1;
    await url.save();

    // Get client info and save to analytics
    const client = await getClientInfo(req);
    console.log(client)
    await Analytics.create({
      shortId,
      ip: client.ip,
      browser: client.browser,
      platform: client.platform,
      country: client.country,
    });

    return res.redirect(url.longUrl);
  } catch (err) {
    next(err);
  }
};
