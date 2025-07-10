import Analytics from "../models/Analytics.js";
export const getAnalytics = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const records = await Analytics.find({ shortId }).sort({ createdAt: -1 });

    res.status(200).json({
      shortId,
      totalClicks: records.length,
      data: records
    });
  } catch (err) {
    next(err);
  }
};
