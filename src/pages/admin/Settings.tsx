import { useState, useEffect } from "react";
import { Save, Eye, EyeOff } from "lucide-react";
import { store, PlatformSettings } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<PlatformSettings>({ contactEmail: "", bookingEmail: "", socialInstagram: "", socialYoutube: "", socialFacebook: "", adminPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { store.getSettings().then(setSettings); }, []);

  const handleSave = async () => {
    setSaving(true);
    await store.updateSettings({
      contactEmail: settings.contactEmail,
      bookingEmail: settings.bookingEmail,
      socialInstagram: settings.socialInstagram,
      socialFacebook: settings.socialFacebook,
    });
    setSaving(false);
    toast({ title: "Settings saved" });
  };

  const handlePasswordChange = () => {
    if (!newPass.trim()) return;
    if (newPass.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (newPass !== confirmPass) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    store.changeAdminPassword(newPass);
    setNewPass("");
    setConfirmPass("");
    toast({ title: "Password updated — use it on your next login" });
  };

  const inputClass = "mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white";

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Platform contact info, social links, and security</p>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-heading text-base font-bold">Contact & Email</h2>
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase">General Contact Email</label>
          <input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            className={inputClass}
            placeholder="Info@Evolve2Purpose.com"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase">Speaking Bookings Email</label>
          <input
            type="email"
            value={settings.bookingEmail}
            onChange={(e) => setSettings({ ...settings, bookingEmail: e.target.value })}
            className={inputClass}
            placeholder="bookings@evolve2purpose.com"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-heading text-base font-bold">Social Media</h2>
        {[
          { key: "socialInstagram" as const, label: "Instagram URL", placeholder: "https://www.instagram.com/ms_sarahadams/" },
          { key: "socialFacebook" as const, label: "Facebook URL", placeholder: "https://www.facebook.com/share/1D2TxyrEfZ/?mibextid=wwXIfr" },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-xs font-semibold text-muted-foreground uppercase">{label}</label>
            <input
              type="url"
              value={settings[key]}
              onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
              className={inputClass}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-60 transition-all"
        style={{ background: "#FF2DAA" }}
      >
        <Save size={14} /> {saving ? "Saving…" : "Save Settings"}
      </button>

      {/* Password */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
        <div>
          <h2 className="font-heading text-base font-bold">Change Admin Password</h2>
          <p className="text-xs text-muted-foreground mt-0.5">After changing, you'll need the new password on your next login.</p>
        </div>
        <div className="relative">
          <label className="text-xs font-semibold text-muted-foreground uppercase">New Password</label>
          <div className="relative mt-1">
            <input
              type={showPass ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className={`${inputClass} !mt-0 pr-11`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase">Confirm Password</label>
          <input
            type={showPass ? "text" : "password"}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className={inputClass}
            placeholder="Confirm new password"
          />
        </div>
        <button
          onClick={handlePasswordChange}
          disabled={!newPass.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-border bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
