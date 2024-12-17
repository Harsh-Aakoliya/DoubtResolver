import mongoose from "mongoose";
const dailyVisitorSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  uniqueVisitors: [{ type: String }], // Store unique visitor IPs for the day
});

const viewSchema = new mongoose.Schema({
  count: { type: Number, default: 0 }, // Total views
  globalUniqueVisitors: [{ type: String }], // Store global unique IPs
  dailyVisitors: [dailyVisitorSchema], // Array of daily visitor data
});

export default mongoose.model("View", viewSchema);

