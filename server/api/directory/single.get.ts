import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const supabase = createClient(
    process.env.NUXT_SUPABASE_URL!,
    process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY!
  );

  const { id } = getQuery(event);
  if (!id) {
    throw createError({ statusCode: 400, message: "Missing directory ID" });
  }

  try {
    const { data, error } = await supabase
      .from("directory")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw createError({ statusCode: 500, message: error.message });
    }
    return { success: true, data };
  } catch (err) {
    console.error(`Error fetching directory with id ${id}:`, err);
    return { success: false, message: "Internal Server Error" };
  }
});
