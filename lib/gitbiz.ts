import { createClient } from "@supabase/supabase-js";

export interface GitBizRepo {
  id: number;
  name: string;
  full_name: string;
  url: string;
  description: string | null;
  stars: number;
  language: string | null;
  score: number;
  output_json: {
    summary?: string;
    product_idea?: string;
    opportunity?: string;
    target_user?: string;
    target_customer?: string;
    monetization?: string;
    features?: string[];
    hidden_capability?: string;
    scores?: {
      business_potential?: number;
      novelty?: number;
      ease_of_mvp?: number;
      confidence?: number;
    };
  } | null;
  created_at: string;
}

function getClient() {
  const url = process.env.GITBIZ_SUPABASE_URL;
  const key = process.env.GITBIZ_SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error("GitBiz Supabase env vars not set");
  return createClient(url, key);
}

export async function getPostedRepos(
  page = 1,
  pageSize = 10
): Promise<{ repos: GitBizRepo[]; total: number }> {
  const supabase = getClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("repos")
    .select(
      "id, name, full_name, url, description, stars, language, score, output_json, created_at",
      { count: "exact" }
    )
    .eq("llm_status", "KEEP")
    .eq("discord_posted", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(`GitBiz fetch failed: ${error.message}`);
  return { repos: (data ?? []) as GitBizRepo[], total: count ?? 0 };
}
