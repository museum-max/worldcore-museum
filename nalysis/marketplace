from pathlib import Path
import os, zipfile

base = Path("/mnt/data/worlcore-museum-3d")
component = base / "components" / "Museum3D.tsx"
s = component.read_text(encoding="utf-8")

# Add icon-friendly NFT artwork metadata and sidebar UI; keep existing 3D scene.
s = s.replace(
'''  accent: string;
};''',
'''  accent: string;
  category: string;
  image: string;
};'''
)
s = s.replace(
'''price: "0.25 ETH", position: [-4.4, 1.65, -1.7], kind: "orb", accent: "#e9bb55"
''',
'''price: "0.25 ETH", position: [-4.4, 1.65, -1.7], kind: "orb", accent: "#e9bb55", category: "Relics", image: "☼"
'''
)
s = s.replace(
'''price: "0.42 ETH", position: [-1.5, 1.65, -2.4], kind: "mask", accent: "#f1ce79"
''',
'''price: "0.42 ETH", position: [-1.5, 1.65, -2.4], kind: "mask", accent: "#f1ce79", category: "Guardians", image: "◇"
'''
)
s = s.replace(
'''price: "0.18 ETH", position: [1.5, 1.7, -2.4], kind: "crystal", accent: "#b4a1ff"
''',
'''price: "0.18 ETH", position: [1.5, 1.7, -2.4], kind: "crystal", accent: "#b4a1ff", category: "Crystals", image: "✧"
'''
)
s = s.replace(
'''price: "0.36 ETH", position: [4.4, 1.65, -1.7], kind: "relic", accent: "#e4a84e"
''',
'''price: "0.36 ETH", position: [4.4, 1.65, -1.7], kind: "relic", accent: "#e4a84e", category: "Relics", image: "∞"
'''
)

# Replace default component's beginning and insert marketplace controls / UI.
s = s.replace(
'''export default function Museum3D() {
  const [selected, setSelected] = useState<Exhibit | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <main className="museum-app">''',
'''export default function Museum3D() {
  const [selected, setSelected] = useState<Exhibit | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All NFTs");
  const [showAddForm, setShowAddForm] = useState(false);
  const [customNfts, setCustomNfts] = useState<Exhibit[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("0.10");
  const [newCategory, setNewCategory] = useState("Relics");
  const [newDescription, setNewDescription] = useState("");
  const allNfts = [...exhibits, ...customNfts];
  const filteredNfts = allNfts.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All NFTs" || item.category === category)
  );

  function addNft(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    const accents: Record<string, string> = { Relics: "#e9bb55", Guardians: "#f1ce79", Crystals: "#b4a1ff", Art: "#8ccfc6" };
    const nft: Exhibit = {
      id: Date.now(),
      title,
      era: "Community Collection · New",
      description: newDescription.trim() || "A community-submitted digital collectible in the WORLCORE demo gallery.",
      price: `${Math.max(0, Number(newPrice) || 0).toFixed(2)} ETH`,
      position: [0, 1.8, -0.5],
      kind: "crystal",
      accent: accents[newCategory] || "#e9bb55",
      category: newCategory,
      image: newCategory === "Crystals" ? "✧" : newCategory === "Guardians" ? "◇" : "☼"
    };
    setCustomNfts((items) => [...items, nft]);
    setSelected(nft);
    setNewTitle("");
    setNewDescription("");
    setShowAddForm(false);
  }

  return (
    <main className="museum-app">''')
# replace old scene section
old = '''      <section className="scene-section" aria-label="Interactive 3D museum">
        <div className="scene-label"><span className="live-dot" /> LIVE 3D EXHIBITION <span className="scene-label-right">DRAG TO ORBIT · SCROLL TO ZOOM</span></div>
        <div className="canvas-wrap">
          <Suspense fallback={<div className="loading-scene">Preparing the museum…</div>}>
            <Canvas shadows camera={{ position: [0, 5.5, 11.5], fov: 48 }} dpr={[1, 1.7]}>
              <MuseumScene onSelect={setSelected} />
            </Canvas>
          </Suspense>
          <div className="canvas-vignette" />
          <div className="scene-hint"><span className="mouse-icon">↔</span> Drag to explore <span className="hint-dot">·</span> Click an artifact</div>
          <div className="scene-corner scene-corner-left">WC / EXHIBIT HALL 01</div>
          <div className="scene-corner scene-corner-right">EST. MMXXIV</div>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section-heading">
          <div><div className="eyebrow">CURATED DIGITAL COLLECTION</div><h2>Featured <em>Artifacts</em></h2></div>
          <span className="collection-count">COLLECTION 001 — 004</span>
        </div>
        <div className="artifact-grid">
          {exhibits.map((item, index) => (
            <button className="artifact-card" key={item.id} onClick={() => setSelected(item)}>
              <div className={`artifact-art art-${item.kind}`}>
                <span className="art-index">0{index + 1}</span>
                <div className="art-glow" />
                <div className={`art-shape shape-${item.kind}`}>{item.kind === "orb" ? "◉" : item.kind === "mask" ? "◇" : item.kind === "crystal" ? "✧" : "∞"}</div>
                <span className="art-view">VIEW ARTIFACT ↗</span>
              </div>
              <div className="card-details">
                <div><h3>{item.title}</h3><p>{item.era}</p></div>
                <span className="card-price">{item.price}</span>
              </div>
            </button>
          ))}
        </div>
      </section>'''
new = '''      <section className="marketplace-layout" id="gallery">
        <aside className="nft-sidebar">
          <div className="sidebar-heading">
            <div><div className="eyebrow">COLLECTION</div><h2>NFT <em>Market</em></h2></div>
            <span className="nft-count">{allNfts.length.toString().padStart(2, "0")}</span>
          </div>
          <button className="add-nft-button" onClick={() => setShowAddForm((v) => !v)}><span>＋</span> Add Your NFT</button>
          {showAddForm && (
            <form className="add-nft-form" onSubmit={addNft}>
              <label>Artwork name<input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Moon Relic" required maxLength={60} /></label>
              <label>Demo price (ETH)<input type="number" min="0" step="0.01" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required /></label>
              <label>Category<select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}><option>Relics</option><option>Guardians</option><option>Crystals</option><option>Art</option></select></label>
              <label>Description<textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Tell the story of your NFT…" rows={3} /></label>
              <p className="form-note">Demo only: this adds an item to the current page session, not to a blockchain.</p>
              <button className="add-nft-button form-submit" type="submit">Add to Gallery</button>
            </form>
          )}
          <label className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search collectibles…" /></label>
          <div className="category-list">
            {["All NFTs", "Relics", "Guardians", "Crystals", "Art"].map((cat) => (
              <button key={cat} className={category === cat ? "category-button active" : "category-button"} onClick={() => setCategory(cat)}>
                <span>{cat === "All NFTs" ? "▦" : cat === "Relics" ? "☼" : cat === "Guardians" ? "◇" : cat === "Crystals" ? "✧" : "▧"}</span>{cat}
                <small>{cat === "All NFTs" ? allNfts.length : allNfts.filter((n) => n.category === cat).length}</small>
              </button>
            ))}
          </div>
          <div className="sidebar-divider" />
          <div className="sidebar-subheading">AVAILABLE COLLECTIBLES <span>{filteredNfts.length}</span></div>
          <div className="sidebar-nft-list">
            {filteredNfts.map((item, index) => (
              <button key={item.id} className={`sidebar-nft ${selected?.id === item.id ? "selected" : ""}`} onClick={() => setSelected(item)}>
                <span className={`nft-thumb thumb-${item.kind}`} style={{ "--nft-accent": item.accent } as React.CSSProperties}>{item.image}</span>
                <span className="nft-info"><strong>{item.title}</strong><small>{item.category} · #{String(index + 1).padStart(3, "0")}</small><b>{item.price}</b></span>
                <span className="nft-arrow">↗</span>
              </button>
            ))}
            {filteredNfts.length === 0 && <p className="empty-state">No collectibles found. Try another search.</p>}
          </div>
          <div className="sidebar-footnote"><span className="live-dot" /> DEMO MARKETPLACE <small>Prices are illustrative only</small></div>
        </aside>

        <div className="market-main">
          <div className="market-main-top">
            <div><div className="eyebrow">IMMERSIVE DIGITAL EXHIBITION</div><h2>Explore the <em>Collection</em></h2></div>
            <div className="market-status"><span className="live-dot" /> 3D GALLERY LIVE</div>
          </div>
          <div className="scene-label"><span className="live-dot" /> WORLCORE HALL 01 <span className="scene-label-right">DRAG TO ORBIT · SCROLL TO ZOOM</span></div>
          <div className="canvas-wrap">
            <Suspense fallback={<div className="loading-scene">Preparing the museum…</div>}>
              <Canvas shadows camera={{ position: [0, 5.5, 11.5], fov: 48 }} dpr={[1, 1.7]}>
                <MuseumScene onSelect={setSelected} />
              </Canvas>
            </Suspense>
            <div className="canvas-vignette" />
            <div className="scene-hint"><span className="mouse-icon">↔</span> Drag to explore <span className="hint-dot">·</span> Click an artifact</div>
            <div className="scene-corner scene-corner-left">WC / EXHIBIT HALL 01</div>
            <div className="scene-corner scene-corner-right">EST. MMXXIV</div>
          </div>
          <div className="market-bottom-note"><span>✧</span> Select an NFT from the sidebar to inspect its story and listing details.</div>
        </div>
      </section>'''
if old not in s:
    raise RuntimeError("Could not find scene section to replace")
s = s.replace(old, new)

# Replace selected modal details and add a purchase demo button.
s = s.replace(
'''              <p className="demo-note">Concept exhibit only. This item is not currently minted or available for purchase.</p>
              <button className="wallet-button modal-wallet" onClick={() => alert("NFT minting will be added after a smart contract and wallet flow are configured.")}>NFT DETAILS <span>↗</span></button>''',
'''              <p className="demo-note">Concept exhibit only. Prices are illustrative; this item is not minted or available for purchase.</p>
              <button className="wallet-button modal-wallet" onClick={() => alert("Demo marketplace only. No purchase was made. Connect a wallet and configure a reviewed smart contract before enabling real purchases.")}>BUY NFT <span>↗</span></button>'''
)

component.write_text(s, encoding="utf-8")

css = base / "app" / "globals.css"
c = css.read_text(encoding="utf-8")
c += r'''

/* NFT marketplace sidebar layout */
.marketplace-layout { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 0; padding: 0 3.5% 70px; align-items: stretch; }
.nft-sidebar { min-width: 0; border: 1px solid rgba(201,160,82,.24); background: linear-gradient(180deg, #100f0c, #0b0b09); padding: 22px 16px 16px; display: flex; flex-direction: column; }
.sidebar-heading { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 19px; }
.sidebar-heading h2, .market-main-top h2 { font: 500 27px 'Playfair Display', serif; margin: 7px 0 0; }
.sidebar-heading h2 em, .market-main-top h2 em { color: var(--gold-light); }
.nft-count { border: 1px solid var(--line); padding: 6px 8px; color: #d9bc75; font: 10px 'DM Mono', monospace; }
.add-nft-button { display: flex; justify-content: center; align-items: center; gap: 8px; border: 1px solid rgba(201,160,82,.6); background: rgba(201,160,82,.12); color: #f0d38b; padding: 12px 10px; font: 10px 'DM Mono', monospace; letter-spacing: .04em; transition: .2s; }
.add-nft-button:hover { background: rgba(201,160,82,.22); }
.add-nft-button span { font-size: 17px; }
.add-nft-form { display: grid; gap: 11px; padding: 14px 0 16px; border-bottom: 1px solid var(--line); }
.add-nft-form label { display: grid; gap: 6px; color: #c6b99c; font: 9px 'DM Mono', monospace; letter-spacing: .05em; }
.add-nft-form input, .add-nft-form select, .add-nft-form textarea { width: 100%; min-width: 0; border: 1px solid rgba(201,160,82,.25); border-radius: 0; background: #080807; color: #eee4ce; padding: 10px; font: 11px 'DM Sans', sans-serif; outline: none; }
.add-nft-form input:focus, .add-nft-form select:focus, .add-nft-form textarea:focus, .search-box input:focus { border-color: var(--gold); }
.add-nft-form textarea { resize: vertical; }
.form-note { color: #857a65; font-size: 9px; line-height: 1.55; margin: 0; }
.form-submit { width: 100%; }
.search-box { display: flex; align-items: center; gap: 8px; margin-top: 17px; border: 1px solid rgba(201,160,82,.22); background: #090908; padding: 0 10px; color: #c8a55e; }
.search-box span { font-size: 21px; }
.search-box input { width: 100%; min-width: 0; border: 0; outline: 0; background: transparent; color: #eee4ce; padding: 12px 0; font-size: 10px; }
.category-list { display: grid; gap: 3px; margin-top: 13px; }
.category-button { display: flex; align-items: center; gap: 10px; border: 1px solid transparent; background: transparent; color: #a8a091; padding: 10px; text-align: left; font-size: 11px; }
.category-button > span { width: 19px; color: #c3a15d; font-size: 14px; text-align: center; }
.category-button small { margin-left: auto; color: #77705f; font: 9px 'DM Mono', monospace; }
.category-button:hover, .category-button.active { border-color: rgba(201,160,82,.22); background: rgba(201,160,82,.08); color: #f0d38b; }
.sidebar-divider { height: 1px; background: var(--line); margin: 17px 0; }
.sidebar-subheading { display: flex; justify-content: space-between; color: #8f8266; font: 8px 'DM Mono', monospace; letter-spacing: .08em; margin-bottom: 10px; }
.sidebar-subheading span { color: #d2b56f; }
.sidebar-nft-list { display: grid; gap: 6px; }
.sidebar-nft { display: flex; align-items: center; gap: 10px; width: 100%; min-width: 0; padding: 9px 7px; text-align: left; border: 1px solid transparent; background: rgba(255,255,255,.015); color: #eee4ce; transition: .2s; }
.sidebar-nft:hover, .sidebar-nft.selected { border-color: rgba(201,160,82,.45); background: rgba(201,160,82,.075); }
.nft-thumb { display: grid; place-items: center; flex: 0 0 49px; width: 49px; height: 55px; border: 1px solid rgba(201,160,82,.24); background: radial-gradient(circle, color-mix(in srgb, var(--nft-accent) 25%, #17120a), #080807 78%); color: var(--nft-accent); font: 29px 'Playfair Display', serif; text-shadow: 0 0 15px var(--nft-accent); }
.thumb-crystal { background: radial-gradient(circle, #29213f, #080807 78%); }
.nft-info { display: grid; gap: 5px; min-width: 0; flex: 1; }
.nft-info strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: 500 12px 'Playfair Display', serif; }
.nft-info small { color: #8b816e; font: 8px 'DM Mono', monospace; }
.nft-info b { color: #d7b96e; font: 9px 'DM Mono', monospace; }
.nft-arrow { align-self: flex-start; color: #9b8150; font-size: 13px; }
.empty-state { color: #8d8474; font-size: 11px; line-height: 1.7; }
.sidebar-footnote { display: grid; grid-template-columns: 7px 1fr; gap: 8px; align-items: center; margin-top: auto; padding-top: 24px; color: #9b8a63; font: 8px 'DM Mono', monospace; letter-spacing: .08em; }
.sidebar-footnote small { grid-column: 2; color: #6e675a; letter-spacing: 0; }
.market-main { min-width: 0; padding-left: 20px; }
.market-main-top { display: flex; justify-content: space-between; align-items: end; gap: 14px; padding: 1px 0 17px; }
.market-status { display: flex; align-items: center; gap: 8px; color: #95886a; font: 8px 'DM Mono', monospace; letter-spacing: .08em; padding-bottom: 5px; white-space: nowrap; }
.marketplace-layout .scene-section { padding: 0; }
.marketplace-layout .canvas-wrap { height: min(55vw, 570px); min-height: 410px; }
.market-bottom-note { display: flex; gap: 9px; align-items: center; color: #8f8571; font-size: 10px; padding: 13px 2px; }
.market-bottom-note span { color: #d0aa56; font-size: 15px; }
@media (max-width: 1000px) {
  .marketplace-layout { grid-template-columns: 260px minmax(0, 1fr); padding-left: 3%; padding-right: 3%; }
  .market-main { padding-left: 14px; }
  .marketplace-layout .canvas-wrap { min-height: 380px; }
}
@media (max-width: 760px) {
  .marketplace-layout { grid-template-columns: 1fr; padding: 0 4% 45px; gap: 18px; }
  .nft-sidebar { order: 2; }
  .market-main { order: 1; padding-left: 0; }
  .market-main-top h2 { font-size: 25px; }
  .marketplace-layout .canvas-wrap { height: 430px; min-height: 0; }
  .sidebar-nft-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sidebar-footnote { margin-top: 18px; }
}
@media (max-width: 430px) {
  .sidebar-nft-list { grid-template-columns: 1fr; }
  .market-status { font-size: 7px; }
  .marketplace-layout .canvas-wrap { height: 380px; }
}
'''
css.write_text(c, encoding="utf-8")

# Update README for marketplace
readme = base / "README.md"
r = readme.read_text(encoding="utf-8")
r = r.replace(
"## Controls\n- Drag with mouse: orbit around the 3D room",
"## Marketplace features\n- NFT list sidebar with search and category filters\n- Select a collectible to open its detail panel\n- Add Your NFT form adds a demo item for the current page session only\n- Buy NFT is a placeholder button; no blockchain purchase is made\n\n## Controls\n- Drag with mouse: orbit around the 3D room"
)
readme.write_text(r, encoding="utf-8")

zip_path = "/mnt/data/worlcore-museum-3d-nextjs-marketplace.zip"
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
    for root, dirs, filenames in os.walk(base):
        for filename in filenames:
            z.write(os.path.join(root, filename), os.path.relpath(os.path.join(root, filename), base))
print("Marketplace ZIP created:", zip_path, "size:", os.path.getsize(zip_path))
