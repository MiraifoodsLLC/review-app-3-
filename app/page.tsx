"use client";
import { useState } from "react";

export default function Home() {
  const [rating, setRating] = useState(0);
  const [dishRating, setDishRating] = useState(0);
  const [ordered, setOrdered] = useState("");
  const [taste, setTaste] = useState<string[]>([]);
  const [volume, setVolume] = useState("");
  const [service, setService] = useState<string[]>([]);
  const [again, setAgain] = useState("");
  const [comment, setComment] = useState("");
  const [screen, setScreen] = useState<"survey" | "result">("survey");
  const [reviewText, setReviewText] = useState("");

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const generate = () => {
    const starText = ["","★☆☆☆☆","★★☆☆☆","★★★☆☆","★★★★☆","★★★★★"][rating] || "";
    const dishStarText = ["","★☆☆☆☆","★★☆☆☆","★★★☆☆","★★★★☆","★★★★★"][dishRating] || "";
    const lines = [];
    if (starText) lines.push(`総合評価：${starText}`);
    if (ordered) lines.push(`今回は${ordered}をいただきました。`);
    if (dishStarText) lines.push(`料理の評価：${dishStarText}`);
    if (taste.length) lines.push(`味は${taste.join("・")}で、とても満足しました。`);
    if (volume) lines.push(`量は${volume}でした。`);
    if (service.length) lines.push(`${service.join("・")}も印象的でした。`);
    if (again === "はい") lines.push("また必ず来たいと思います。");
    if (again === "友人に勧めたい") lines.push("友人にもぜひ勧めたいお店です。");
    if (comment) lines.push(comment);
    lines.push("ごちそうさまでした！おすすめです。");
    setReviewText(lines.join("\n"));
    setScreen("result");
  };

  const tags = (items: string[], selected: string | string[], onSelect: (v: string) => void) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {items.map((item) => (
        <button key={item} onClick={() => onSelect(item)} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", background: (Array.isArray(selected) ? selected.includes(item) : selected === item) ? "#dbeafe" : "#f3f4f6", border: (Array.isArray(selected) ? selected.includes(item) : selected === item) ? "1px solid #93c5fd" : "1px solid #e5e7eb", color: (Array.isArray(selected) ? selected.includes(item) : selected === item) ? "#1d4ed8" : "#374151" }}>{item}</button>
      ))}
    </div>
  );

  return (
    <main style={{ maxWidth: 420, margin: "0 auto", padding: "1rem", fontFamily: "sans-serif" }}>
      {screen === "survey" ? (
        <>
          <p style={{ fontSize: 13, color: "#6b7280" }}>食後のご感想をお聞かせください</p>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>今回注文したお料理は？</p>
            <input value={ordered} onChange={(e) => setOrdered(e.target.value)} placeholder="例：ランチセット、パスタ" style={{ width: "100%", boxSizing: "border-box", padding: "8px", borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14 }} />
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>料理の評価</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[1,2,3,4,5].map((v) => (
                <span key={v} onClick={() => setDishRating(v)} style={{ fontSize: 30, cursor: "pointer", color: v <= dishRating ? "#f59e0b" : "#d1d5db" }}>★</span>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>味はどうでしたか？</p>
            {tags(["おいしい","絶品","ちょうどいい","あっさり","こってり","独創的"], taste, (v) => setTaste(toggleArray(taste, v)))}
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>量はどうでしたか？</p>
            {tags(["多すぎる","ちょうどいい","少し少ない","もっと食べたい"], volume, setVolume)}
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>サービス・雰囲気はどうでしたか？</p>
            {tags(["スタッフが親切","居心地がいい","清潔感がある","おしゃれ","コスパが良い"], service, (v) => setService(toggleArray(service, v)))}
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>また来たいですか？</p>
            {tags(["はい","友人に勧めたい","機会があれば"], again, setAgain)}
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>総合評価</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[1,2,3,4,5].map((v) => (
                <span key={v} onClick={() => setRating(v)} style={{ fontSize: 30, cursor: "pointer", color: v <= rating ? "#f59e0b" : "#d1d5db" }}>★</span>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>一言コメント（任意）</p>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="感想をご自由にどうぞ..." style={{ width: "100%", boxSizing: "border-box", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, minHeight: 72, resize: "none" }} />
          </div>
          <button onClick={generate} style={{ width: "100%", padding: 13, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 15, cursor: "pointer", background: "#fff" }}>
            クチコミ文を生成する →
          </button>
        </>
      ) : (
        <>
          <p style={{ fontSize: 13, color: "#6b7280" }}>クチコミ文ができました！</p>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>生成されたクチコミ</p>
            <p style={{ fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{reviewText}</p>
          </div>
          <button onClick={() => { navigator.clipboard.writeText(reviewText); window.open("https://search.google.com/local/writereview?placeid=ChIJQ_JhX9oPAWARPySrRzKjREU", "_blank"); }} style={{ width: "100%", padding: 13, borderRadius: 8, border: "none", fontSize: 15, cursor: "pointer", background: "#dbeafe", color: "#1d4ed8", fontWeight: 500, marginBottom: 8 }}>
            Googleマップに投稿する ↗
          </button>
          <button onClick={() => setScreen("survey")} style={{ width: "100%", padding: 13, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 15, cursor: "pointer", background: "#fff" }}>
            ← やり直す
          </button>
        </>
      )}
    </main>
  );
}