import connectDB from "@/lib/config/db";
import BetweenAdsModel from "@/lib/models/betweenAdsModel";
import BottomAdsModel from "@/lib/models/bottomAdsModel";

const serialize = (value) => JSON.parse(JSON.stringify(value));

export async function getBetweenAds() {
  try {
    await connectDB();
    const ads = await BetweenAdsModel.find().sort({ createdAt: -1 }).lean();
    return serialize(ads);
  } catch (error) {
    console.error("Error fetching between ads:", error);
    return [];
  }
}

export async function getBottomAds() {
  try {
    await connectDB();
    const ads = await BottomAdsModel.find().sort({ createdAt: -1 }).lean();
    return serialize(ads);
  } catch (error) {
    console.error("Error fetching bottom ads:", error);
    return [];
  }
}
