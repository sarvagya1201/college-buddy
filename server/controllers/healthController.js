import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const healthCheck = async (req, res) => {
  try {
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ status: "error", message: "Supabase issue" });
    }

    return res.status(200).json({ status: "ok", buckets: data.map(b => b.name) });
  } catch (err) {
    console.error("Health check failed:", err);
    res.status(500).json({ status: "error", message: "Health check failed" });
  }
};
