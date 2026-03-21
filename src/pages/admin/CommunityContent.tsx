import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, X, Pin, Link as LinkIcon } from "lucide-react";
import { store, CommunityPost, CommunityEvent, Resource } from "@/lib/adminStore";
import { useToast } from "@/hooks/use-toast";

type Tab = "posts" | "events" | "resources";

// ─── Posts ────────────────────────────────────────────────────────────────────

const postTypeConfig: Record<CommunityPost["type"], { label: string; bg: string; text: string }> = {
  announcement: { label: "Announcement", bg: "rgba(99,102,241,0.1)", text: "#6366F1" },
  inspiration: { label: "Inspiration", bg: "rgba(255,45,170,0.1)", text: "#FF2DAA" },
  resource: { label: "Resource", bg: "rgba(16,185,129,0.1)", text: "#10B981" },
};

const PostsTab = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<CommunityPost[]>([]);
  const [modal, setModal] = useState<{ open: boolean; editing: CommunityPost | null }>({ open: false, editing: null });
  const [form, setForm] = useState<{ content: string; author: string; type: CommunityPost["type"]; pinned: boolean }>({
    content: "", author: "Sarah Adams", type: "inspiration", pinned: false,
  });

  useEffect(() => { store.getCommunityPosts().then(setItems); }, []);

  const refresh = () => store.getCommunityPosts().then(setItems);
  const openAdd = () => { setForm({ content: "", author: "Sarah Adams", type: "inspiration", pinned: false }); setModal({ open: true, editing: null }); };
  const openEdit = (p: CommunityPost) => { setForm({ content: p.content, author: p.author, type: p.type, pinned: p.pinned }); setModal({ open: true, editing: p }); };
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = async () => {
    if (!form.content.trim()) return;
    if (modal.editing) {
      await store.updateCommunityPost(modal.editing.id, form);
      toast({ title: "Post updated" });
    } else {
      await store.addCommunityPost(form);
      toast({ title: "Post added" });
    }
    refresh();
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await store.deleteCommunityPost(id);
    refresh();
    toast({ title: "Post deleted" });
  };

  const togglePin = async (p: CommunityPost) => {
    await store.updateCommunityPost(p.id, { pinned: !p.pinned });
    refresh();
    toast({ title: p.pinned ? "Post unpinned" : "Post pinned" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} community posts</p>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90" style={{ background: "#FF2DAA" }}>
          <Plus size={14} /> Add Post
        </button>
      </div>

      <div className="space-y-3">
        {items.map((p) => {
          const tc = postTypeConfig[p.type];
          return (
            <div key={p.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full" style={{ background: tc.bg, color: tc.text }}>{tc.label}</span>
                  {p.pinned && <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">Pinned</span>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => togglePin(p)} className={`p-1.5 rounded-lg transition-colors ${p.pinned ? "text-amber-500 bg-amber-50" : "text-muted-foreground hover:bg-gray-100"}`} title={p.pinned ? "Unpin" : "Pin"}><Pin size={13} /></button>
                  <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"><Edit2 size={13} /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{p.content}</p>
              <p className="text-xs text-muted-foreground mt-3">{p.author} · {p.createdAt}</p>
            </div>
          );
        })}
        {items.length === 0 && <div className="text-center py-10 text-muted-foreground text-sm bg-white rounded-2xl border border-border">No posts yet.</div>}
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
            <button onClick={closeModal} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">{modal.editing ? "Edit Post" : "New Post"}</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as CommunityPost["type"] })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white">
                    {(Object.entries(postTypeConfig) as [CommunityPost["type"], { label: string }][]).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Author</label>
                  <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Content *</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" placeholder="Write your post..." autoFocus />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} className="rounded" />
                <span className="text-sm">Pin this post</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={!form.content.trim()} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-40" style={{ background: "#FF2DAA" }}>{modal.editing ? "Save" : "Post"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Events ───────────────────────────────────────────────────────────────────

const EventsTab = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<CommunityEvent[]>([]);
  const [modal, setModal] = useState<{ open: boolean; editing: CommunityEvent | null }>({ open: false, editing: null });
  const [form, setForm] = useState<{ title: string; description: string; date: string; time: string; format: CommunityEvent["format"]; link: string }>({
    title: "", description: "", date: "", time: "", format: "zoom", link: "",
  });

  useEffect(() => { store.getCommunityEvents().then(setItems); }, []);

  const refresh = () => store.getCommunityEvents().then(setItems);
  const openAdd = () => { setForm({ title: "", description: "", date: "", time: "", format: "zoom", link: "" }); setModal({ open: true, editing: null }); };
  const openEdit = (e: CommunityEvent) => { setForm({ title: e.title, description: e.description, date: e.date, time: e.time, format: e.format, link: e.link || "" }); setModal({ open: true, editing: e }); };
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = async () => {
    if (!form.title.trim() || !form.date) return;
    const payload: Omit<CommunityEvent, "id"> = { title: form.title, description: form.description, date: form.date, time: form.time, format: form.format, ...(form.link ? { link: form.link } : {}) };
    if (modal.editing) {
      await store.updateCommunityEvent(modal.editing.id, payload);
      toast({ title: "Event updated" });
    } else {
      await store.addCommunityEvent(payload);
      toast({ title: "Event added" });
    }
    refresh();
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await store.deleteCommunityEvent(id);
    refresh();
    toast({ title: "Event deleted" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} upcoming events</p>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90" style={{ background: "#FF2DAA" }}>
          <Plus size={14} /> Add Event
        </button>
      </div>

      <div className="space-y-3">
        {items.map((e) => (
          <div key={e.id} className="bg-white rounded-2xl border border-border p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-bold text-foreground">{e.title}</p>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{e.format}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{e.date} at {e.time}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{e.description}</p>
                {e.link && <p className="text-xs text-blue-500 mt-1 truncate">{e.link}</p>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEdit(e)} className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(e.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-center py-10 text-muted-foreground text-sm bg-white rounded-2xl border border-border">No events yet.</div>}
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">{modal.editing ? "Edit Event" : "Add Event"}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Event title" autoFocus />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Date *</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Time</label>
                  <input type="text" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="7:00 PM EST" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Format</label>
                <select value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value as CommunityEvent["format"] })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white">
                  <option value="zoom">Zoom</option>
                  <option value="in-person">In-Person</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" placeholder="Brief description..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Meeting Link (optional)</label>
                <input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="https://zoom.us/j/..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={!form.title.trim() || !form.date} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-40" style={{ background: "#FF2DAA" }}>{modal.editing ? "Save" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Resources ────────────────────────────────────────────────────────────────

const typeConfig: Record<Resource["type"], { label: string; bg: string; text: string }> = {
  pdf: { label: "PDF", bg: "rgba(239,68,68,0.1)", text: "#EF4444" },
  workbook: { label: "Workbook", bg: "rgba(245,158,11,0.1)", text: "#F59E0B" },
  audio: { label: "Audio", bg: "rgba(139,92,246,0.1)", text: "#8B5CF6" },
  video: { label: "Video", bg: "rgba(59,130,246,0.1)", text: "#3B82F6" },
  link: { label: "Link", bg: "rgba(16,185,129,0.1)", text: "#10B981" },
};

const ResourcesTab = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Resource[]>([]);
  const [modal, setModal] = useState<{ open: boolean; editing: Resource | null }>({ open: false, editing: null });
  const [form, setForm] = useState<{ title: string; description: string; category: string; type: Resource["type"]; externalLink: string }>({
    title: "", description: "", category: "", type: "pdf", externalLink: "",
  });

  useEffect(() => { store.getResources().then(setItems); }, []);

  const refresh = () => store.getResources().then(setItems);
  const openAdd = () => { setForm({ title: "", description: "", category: "", type: "pdf", externalLink: "" }); setModal({ open: true, editing: null }); };
  const openEdit = (r: Resource) => { setForm({ title: r.title, description: r.description, category: r.category, type: r.type, externalLink: r.externalLink || "" }); setModal({ open: true, editing: r }); };
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = async () => {
    if (!form.title.trim()) return;
    const payload: Omit<Resource, "id" | "addedAt"> = { title: form.title, description: form.description, category: form.category, type: form.type, ...(form.externalLink ? { externalLink: form.externalLink } : {}) };
    if (modal.editing) {
      await store.updateResource(modal.editing.id, payload);
      toast({ title: "Resource updated" });
    } else {
      await store.addResource(payload);
      toast({ title: "Resource added" });
    }
    refresh();
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this resource?")) return;
    await store.deleteResource(id);
    refresh();
    toast({ title: "Resource deleted" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} resources in the library</p>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90" style={{ background: "#FF2DAA" }}>
          <Plus size={14} /> Add Resource
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="divide-y divide-border/50">
          {items.map((r) => {
            const tc = typeConfig[r.type];
            return (
              <div key={r.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">{r.title}</p>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0" style={{ background: tc.bg, color: tc.text }}>{tc.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.category} · Added {r.addedAt}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{r.description}</p>
                  {r.externalLink && (
                    <a href={r.externalLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-500 mt-1 hover:underline">
                      <LinkIcon size={10} /> {r.externalLink.replace(/^https?:\/\//, "").split("/")[0]}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(r)} className="p-1.5 rounded-lg hover:bg-gray-100 text-muted-foreground hover:text-foreground transition-colors"><Edit2 size={13} /></button>
                  <button onClick={() => handleDelete(r.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
            );
          })}
          {items.length === 0 && <div className="text-center py-10 text-muted-foreground text-sm">No resources yet.</div>}
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-gray-100"><X size={16} /></button>
            <h2 className="font-heading text-xl font-bold mb-6">{modal.editing ? "Edit Resource" : "Add Resource"}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Resource title" autoFocus />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Resource["type"] })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white">
                    {(Object.keys(typeConfig) as Resource["type"][]).map((k) => <option key={k} value={k}>{typeConfig[k].label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. Healing Tools" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" placeholder="Brief description..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">External Link (optional)</label>
                <input type="url" value={form.externalLink} onChange={(e) => setForm({ ...form, externalLink: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="https://..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={!form.title.trim()} className="flex-1 px-4 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 disabled:opacity-40" style={{ background: "#FF2DAA" }}>{modal.editing ? "Save" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const AdminCommunityContent = () => {
  const [tab, setTab] = useState<Tab>("posts");

  const tabs: { key: Tab; label: string }[] = [
    { key: "posts", label: "Posts & Announcements" },
    { key: "events", label: "Events" },
    { key: "resources", label: "Resource Library" },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Community Content</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage posts, events, and resources for community members</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={tab === t.key
              ? { background: "#FF2DAA", color: "white" }
              : { background: "white", color: "#888", border: "1px solid rgba(0,0,0,0.08)" }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "posts" && <PostsTab />}
      {tab === "events" && <EventsTab />}
      {tab === "resources" && <ResourcesTab />}
    </div>
  );
};

export default AdminCommunityContent;
