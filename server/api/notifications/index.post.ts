import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const supabase = createClient(
    process.env.NUXT_SUPABASE_URL!,
    process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY!
  );

  const notificationsData = await readBody(event);
  if (!notificationsData) {
    throw createError({ statusCode: 400, message: "Missing notifications data" });
  }

  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert(notificationsData)
      .select()
      .single();

    if (error) {
      throw createError({ statusCode: 500, message: error.message });
    }

    return { success: true, data };
  } catch (err) {
    console.error("Error creating notifications:", err);
    return { success: false, message: "Internal Server Error" };
  }
});
