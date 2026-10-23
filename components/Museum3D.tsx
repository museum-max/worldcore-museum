"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import {
  Search,
  Plus,
  ShoppingBag,
  Wallet,
  Sparkles,
  ArrowUpRight,
  X,
  Gem,
  Landmark,
} from "lucide-react";
import {
  Suspense,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import type { ThreeEvent } from "@react-three/fiber";

type NFT = {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  color: string;
  symbol: string;
  shape: "orb" | "crystal" | "mask" | "relic";
};

const initialNFTs: NFT[] = [
  {
    id: "wc-001",
    title: "Solar Relic",
    category: "Relics",
    price: "0.25 ETH",
    description:
      "A radiant digital relic inspired by ancient civilizations and the power of the sun.",
    color: "#e6b95c",
    symbol: "☼",
    shape: "orb",
  },
  {
    id: "wc-002",
    title: "Golden Guardian",
    category: "Guardians",
    price: "0.42 ETH",
    description:
      "A mysterious guardian artifact from the imagined WORLCORE archive.",
    color: "#f1d28b",
    symbol: "◇",
    shape: "mask",
  },
  {
    id: "wc-003",
    title: "Amethyst Core",
    category: "Crystals",
    price: "0.18 ETH",
    description:
      "A luminous crystal collectible with a violet glow and a futuristic silhouette.",
    color: "#b6a0ff",
    symbol: "✧",
    shape: "crystal",
  },
  {
    id: "wc-004",
    title: "Eternal Loop",
    category: "Relics",
    price: "0.36 ETH",
    description:
      "A symbol of continuity, memory, and the endless preservation of history.",
    color: "#e5a950",
    symbol: "∞",
    shape: "relic",
  },
];

const categories = ["All NFTs", "Relics", "Guardians", "Crystals", "Art"];

function Artifact({
  nft,
  position,
  onSelect,
}: {
  nft: NFT;
  position: [number, number, number];
  onSelect: (nft: NFT) => void;
}) {
  const click = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(nft);
  };

  return (
    <group position={position} onClick={click}>
      <mesh position={[0, -0.73, 0]}>
        <cylinderGeometry args={[0.67, 0.78, 0.15, 32]} />
        <meshStandardMaterial
          color="#6c5122"
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.43, 0.52, 0.55, 32]} />
        <meshStandardMaterial
          color="#17140e"
          metalness={0.8}
          roughness={0.28}
        />
      </mesh>

      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.22}>
        {nft.shape === "orb" && (
          <mesh position={[0, 0.48, 0]}>
            <icosahedronGeometry args={[0.58, 2]} />
            <meshStandardMaterial
              color={nft.color}
              emissive={nft.color}
              emissiveIntensity={0.55}
              metalness={0.85}
              roughness={0.17}
            />
          </mesh>
        )}

        {nft.shape === "crystal" && (
          <mesh position={[0, 0.45, 0]} rotation={[0.2, 0.4, 0.1]}>
            <octahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial
              color={nft.color}
              emissive={nft.color}
              emissiveIntensity={0.45}
              metalness={0.65}
              roughness={0.2}
            />
          </mesh>
        )}

        {nft.shape === "mask" && (
          <mesh position={[0, 0.46, 0]} rotation={[0, 0, Math.PI / 4]}>
            <octahedronGeometry args={[0.63, 0]} />
            <meshStandardMaterial
              color={nft.color}
              emissive={nft.color}
              emissiveIntensity={0.3}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        )}

        {nft.shape === "relic" && (
          <mesh position={[0, 0.45, 0]} rotation={[0.35, 0, 0.2]}>
            <torusKnotGeometry args={[0.37, 0.13, 100, 16]} />
            <meshStandardMaterial
              color={nft.color}
              emissive={nft.color}
              emissiveIntensity={0.3}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
        )}
      </Float>

      <mesh position={[0, -0.91, 0]}>
        <boxGeometry args={[1.15, 0.06, 1.15]} />
        <meshStandardMaterial color={nft.color} metalness={0.8} />
      </mesh>
    </group>
  );
}

function MuseumScene({
  nfts,
  onSelect,
}: {
  nfts: NFT[];
  onSelect: (nft: NFT) => void;
}) {
  const positions: [number, number, number][] = [
    [-4.1, 1.1, -1.8],
    [-1.4, 1.1, -2.7],
    [1.4, 1.1, -2.7],
    [4.1, 1.1, -1.8],
  ];

  return (
    <>
      <color attach="background" args={["#0b0a08"]} />
      <fog attach="fog" args={["#0b0a08", 11, 23]} />

      <ambientLight intensity={0.7} />
      <pointLight
        position={[0, 7, 2]}
        intensity={110}
        color="#ffd782"
        distance={22}
      />
      <pointLight
        position={[-5, 3, -3]}
        intensity={35}
        color="#d6a444"
      />
      <pointLight
        position={[5, 3, -3]}
        intensity={30}
        color="#a48cff"
      />

      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[17, 0.2, 12]} />
        <meshStandardMaterial
          color="#211b10"
          metalness={0.55}
          roughness={0.4}
        />
      </mesh>

      <mesh position={[0, 3.2, -5.6]}>
        <boxGeometry args={[17, 6.5, 0.25]} />
        <meshStandardMaterial color="#15120d" roughness={0.9} />
      </mesh>

      {[-7, -3.5, 0, 3.5, 7].map((x) => (
        <group key={x} position={[x, 2.8, -5.35]}>
          <mesh>
            <boxGeometry args={[0.06, 5.3, 0.08]} />
            <meshStandardMaterial
              color="#b78d43"
              emissive="#8b6423"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}

      {nfts.slice(0, 4).map((nft, index) => (
        <Artifact
          key={nft.id}
          nft={nft}
          position={positions[index]}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        makeDefault
        enablePan
        minDistance={5}
        maxDistance={17}
        maxPolarAngle={Math.PI / 2.03}
        target={[0, 1, -1]}
      />

      <Environment preset="night" />
    </>
  );
}

export default function Museum3D() {
  const [nfts, setNfts] = useState<NFT[]>(initialNFTs);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All NFTs");
  const [selected, setSelected] = useState<NFT | null>(initialNFTs[0]);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("0.10");
  const [description, setDescription] = useState("");
  const [newCategory, setNewCategory] = useState("Art");
  const [newShape, setNewShape] = useState<NFT["shape"]>("crystal");

  const filteredNFTs = useMemo(() => {
    const query = search.toLowerCase().trim();

    return nfts.filter((nft) => {
      const matchesSearch =
        nft.title.toLowerCase().includes(query) ||
        nft.description.toLowerCase().includes(query);

      const matchesCategory =
        category === "All NFTs" || nft.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [nfts, search, category]);

  function addNFT(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedPrice = Number(price);
    if (!title.trim() || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
      return;
    }

    const palette: Record<string, string> = {
      Relics: "#e6b95c",
      Guardians: "#f1d28b",
      Crystals: "#b6a0ff",
      Art: "#8ad2c6",
    };

    const nft: NFT = {
      id: `wc-${Date.now()}`,
      title: title.trim(),
      category: newCategory,
      price: `${parsedPrice.toFixed(2)} ETH`,
      description:
        description.trim() || "A new community collectible at WORLCORE MUSEUM.",
      color: palette[newCategory] || "#e6b95c",
      symbol: newShape === "orb" ? "☼" : newShape === "relic" ? "∞" : "✧",
      shape: newShape,
    };

    setNfts((current) => [...current, nft]);
    setSelected(nft);
    setCategory("All NFTs");
    setSearch("");
    setTitle("");
    setPrice("0.10");
    setDescription("");
    setShowForm(false);
    setNotice("NFT added to this demo gallery.");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="WORLCORE MUSEUM home">
          <span className="brand-mark"><Landmark size={22} /></span>
          <span>
            <strong>WORLCORE</strong>
            <small>DIGITAL MUSEUM</small>
          </span>
        </a>

        <nav className="top-links">
          <a href="#market">Marketplace</a>
          <a href="#exhibition">3D Exhibition</a>
        </nav>

        <button
          className="wallet-button"
          onClick={() =>
            setNotice("Wallet connection is not configured in this demo.")
          }
        >
          <Wallet size={15} /> Connect Wallet
        </button>
      </header>

      <section className="hero">
        <div className="eyebrow"><Sparkles size={13} /> HISTORY MEETS THE DIGITAL FRONTIER</div>
        <h1>Own a Piece of <em>Wonder.</em></h1>
        <p>
          Discover extraordinary digital artifacts in an immersive world
          where history, art, and technology meet.
        </p>
        <div className="hero-meta">
          <span><i /> IMMERSIVE 3D GALLERY</span>
          <span>·</span>
          <span>CURATED DIGITAL COLLECTIBLES</span>
        </div>
      </section>

      <section className="market-layout" id="market">
        <aside className="sidebar">
          <div className="sidebar-title">
            <div>
              <div className="eyebrow">DISCOVER</div>
              <h2>NFT <em>Market</em></h2>
            </div>
            <span className="count">{nfts.length.toString().padStart(2, "0")}</span>
          </div>

          <button
            className="add-button"
            onClick={() => {
              setShowForm((current) => !current);
              setNotice("");
            }}
          >
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? "Close Form" : "Add Your NFT"}
          </button>

          {showForm && (
            <form className="nft-form" onSubmit={addNFT}>
              <label>
                Artwork name
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Moon Relic"
                  maxLength={60}
                  required
                />
              </label>

              <label>
                Demo price (ETH)
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  max="1000000"
                  step="0.01"
                  required
                />
              </label>

              <label>
                Category
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option>Relics</option>
                  <option>Guardians</option>
                  <option>Crystals</option>
                  <option>Art</option>
                </select>
              </label>

              <label>
                3D display shape
                <select
                  value={newShape}
                  onChange={(e) =>
                    setNewShape(e.target.value as NFT["shape"])
                  }
                >
                  <option value="crystal">Crystal</option>
                  <option value="orb">Orb</option>
                  <option value="mask">Diamond</option>
                  <option value="relic">Eternal Loop</option>
                </select>
              </label>

              <label>
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell the story of your artwork..."
                  rows={3}
                  maxLength={400}
                />
              </label>

              <p className="form-note">
                Demo only. Your item is kept in page memory and is not minted.
              </p>

              <button type="submit" className="add-button submit-button">
                Add to Gallery <ArrowUpRight size={15} />
              </button>
            </form>
          )}

          <label className="search-field">
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search collectibles..."
            />
          </label>

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-button ${category === item ? "active" : ""}`}
                onClick={() => setCategory(item)}
              >
                <span>{item === "All NFTs" ? "▦" : item === "Relics" ? "☼" : item === "Guardians" ? "◇" : item === "Crystals" ? "✧" : "▧"}</span>
                {item}
                <small>
                  {item === "All NFTs"
                    ? nfts.length
                    : nfts.filter((nft) => nft.category === item).length}
                </small>
              </button>
            ))}
          </div>

          <div className="list-heading">
            <span>COLLECTIBLES</span>
            <span>{filteredNFTs.length} ITEMS</span>
          </div>

          <div className="nft-list">
            {filteredNFTs.map((nft, index) => (
              <button
                key={nft.id}
                className={`nft-row ${selected?.id === nft.id ? "selected" : ""}`}
                onClick={() => {
                  setSelected(nft);
                  setNotice("");
                }}
              >
                <span
                  className="nft-symbol"
                  style={{ "--accent": nft.color } as React.CSSProperties}
                >
                  {nft.symbol}
                </span>
                <span className="nft-row-info">
                  <strong>{nft.title}</strong>
                  <small>{nft.category} · #{String(index + 1).padStart(3, "0")}</small>
                  <b>{nft.price}</b>
                </span>
                <ArrowUpRight size={14} className="row-arrow" />
              </button>
            ))}

            {filteredNFTs.length === 0 && (
              <p className="empty-message">No NFTs found. Try another search.</p>
            )}
          </div>

          <div className="sidebar-footer">
            <span className="status-dot" />
            DEMO MARKETPLACE
            <small>Illustrative prices only</small>
          </div>
        </aside>

        <div className="main-panel">
          <div className="panel-heading" id="exhibition">
            <div>
              <div className="eyebrow">THE IMMERSIVE EXHIBITION</div>
              <h2>Explore the <em>Collection</em></h2>
            </div>
            <span className="live-label"><i /> 3D GALLERY</span>
          </div>

          <div className="scene-label">
            <span><i /> WORLCORE HALL 01</span>
            <small>DRAG TO ROTATE · SCROLL TO ZOOM</small>
          </div>

          <div className="scene">
            <Canvas
              shadows
              camera={{ position: [0, 5.2, 11.5], fov: 48 }}
              dpr={[1, 1.7]}
            >
              <Suspense fallback={null}>
                <MuseumScene nfts={nfts} onSelect={setSelected} />
              </Suspense>
            </Canvas>
            <div className="scene-caption">
              <span>WC / EXHIBIT HALL 01</span>
              <span>DRAG TO EXPLORE ↔</span>
            </div>
          </div>

          <div className="scene-tip">
            <Sparkles size={15} />
            Select an artifact in the 3D hall or choose an NFT from the sidebar.
          </div>

          <section className="detail-panel">
            {selected ? (
              <>
                <div
                  className="detail-art"
                  style={{ "--accent": selected.color } as React.CSSProperties}
                >
                  <span>{selected.symbol}</span>
                  <small>WORLCORE · DIGITAL ARTIFACT</small>
                </div>

                <div className="detail-copy">
                  <div className="eyebrow">SELECTED COLLECTIBLE</div>
                  <h3>{selected.title}</h3>
                  <span className="category-pill">{selected.category}</span>
                  <p>{selected.description}</p>
                  <div className="price-label">DEMO LISTING PRICE</div>
                  <div className="detail-price">{selected.price}</div>
                  <button
                    className="buy-button"
                    onClick={() =>
                      setNotice(
                        "Demo only: no purchase was made. Wallet and audited smart-contract integration are required."
                      )
                    }
                  >
                    <ShoppingBag size={16} /> Buy NFT <ArrowUpRight size={16} />
                  </button>
                </div>
              </>
            ) : (
              <p className="empty-message">Choose a collectible to view its details.</p>
            )}
          </section>

          {notice && (
            <div className="notice" role="status">
              <span>{notice}</span>
              <button onClick={() => setNotice("")} aria-label="Dismiss notice">
                <X size={15} />
              </button>
            </div>
          )}

          <div className="bottom-stats">
            <div><strong>{nfts.length.toString().padStart(2, "0")}</strong><span>DEMO ARTIFACTS</span></div>
            <div><strong>3D</strong><span>IMMERSIVE VIEW</span></div>
            <div><strong>WC</strong><span>WORLCORE ARCHIVE</span></div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 WORLCORE MUSEUM</span>
        <span>ART · HISTORY · TECHNOLOGY</span>
      </footer>
    </main>
  );
}
