/**
 * Supabase Auth helpers for admin pages (uses @supabase/supabase-js from CDN).
 */
window.SalonMenu = window.SalonMenu || {};

SalonMenu.auth = (function () {
  let client = null;

  function config() {
    return window.SALONMENU_SUPABASE || {};
  }

  function getClient() {
    if (client) return client;
    const c = config();
    if (!c.url || !c.anonKey || typeof supabase === "undefined") return null;
    client = supabase.createClient(c.url, c.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    return client;
  }

  async function getSession() {
    const sb = getClient();
    if (!sb) return null;
    const { data, error } = await sb.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  async function getProfile() {
    const sb = getClient();
    const session = await getSession();
    if (!sb || !session) return null;
    const { data, error } = await sb
      .from("profiles")
      .select("id, role, full_name")
      .eq("id", session.user.id)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  function isAdminProfile(profile) {
    return profile?.role === "admin";
  }

  async function signIn(email, password) {
    const sb = getClient();
    if (!sb) throw new Error("Supabase is not configured.");
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.session;
  }

  async function signOut() {
    const sb = getClient();
    if (!sb) return;
    await sb.auth.signOut();
  }

  /**
   * @param {{ loginPath?: string, next?: string }} opts
   * @returns {Promise<{ ok: true, session: object, profile: object } | { ok: false, reason: string, message?: string }>}
   */
  async function requireAdmin(opts = {}) {
    const loginPath = opts.loginPath || "/admin/login.html";
    const sb = getClient();
    if (!sb) {
      return { ok: false, reason: "config", message: "Supabase is not configured on this site." };
    }

    const session = await getSession();
    if (!session) {
      const next = opts.next || window.location.pathname + window.location.search;
      window.location.replace(`${loginPath}?next=${encodeURIComponent(next)}`);
      return { ok: false, reason: "redirect" };
    }

    const profile = await getProfile();
    if (!profile) {
      return {
        ok: false,
        reason: "no_profile",
        message: "No profile row found. Run supabase/admin-setup.sql for your user."
      };
    }

    if (!isAdminProfile(profile)) {
      return {
        ok: false,
        reason: "not_admin",
        message: "This account is not an admin. Ask the platform owner to set profiles.role = admin."
      };
    }

    return { ok: true, session, profile };
  }

  return {
    getClient,
    getSession,
    getProfile,
    isAdminProfile,
    signIn,
    signOut,
    requireAdmin
  };
})();
