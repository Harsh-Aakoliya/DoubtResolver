import View from "../models/viewModel.js";

export const getAnalyticsData = async (req, res) => {
    try {
      const view = await View.findOne();
      if (!view) {
        return res.status(200).json({
          globalUniqueCount: 0,
          totalViewCount: 0,
          dailyData: [],
        });
      }
  
      res.status(200).json({
        globalUniqueCount: view.globalUniqueVisitors.length,
        totalViewCount: view.count,
        dailyData: view.dailyVisitors, // Array of daily visitor data
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
const getIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  return forwarded ? forwarded.split(",")[0] : req.connection.remoteAddress;
};

export const incrementViewCount = async (req, res) => {
  try {
    const userIp = getIp(req);
    const today = new Date().toISOString().split("T")[0]; // Get today's date (YYYY-MM-DD)

    let view = await View.findOne();
    if (!view) {
      view = new View();
    }

    // Update global unique visitors
    if (!view.globalUniqueVisitors.includes(userIp)) {
      view.globalUniqueVisitors.push(userIp);
    }

    // Update daily unique visitors
    let dailyData = view.dailyVisitors.find((entry) => entry.date === today);
    if (!dailyData) {
      // Create a new entry for today
      dailyData = { date: today, uniqueVisitors: [] };
      view.dailyVisitors.push(dailyData);
    }

    if (!dailyData.uniqueVisitors.includes(userIp)) {
      dailyData.uniqueVisitors.push(userIp);
    }

    // Increment view count (this includes non-unique views)
    view.count += 1;

    await view.save();
    res.status(200).json({
      message: "View count updated",
      globalUniqueCount: view.globalUniqueVisitors.length,
      dailyUniqueCount: dailyData.uniqueVisitors.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// module.exports = { incrementViewCount, getAnalyticsData };