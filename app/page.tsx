"use client";
import { useState } from "react";

const SUPABASE_URL = "https://edpsltniwjoerhfgcekv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcHNsdG5pd2pvZXJoZmdjZWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4ODM4NDcsImV4cCI6MjA5MjQ1OTg0N30.oKxRAPqXyHK_hbslWRVywK5eY1zLZu03g1VN56D31mI";

export default function Home() {
  const [rating, setRating] = useState(0);
  const [highlight, setHighlight] = useState("");
  const [comment, setComment] = useState("");
  const [screen, setScreen] = useState<"survey" | "result">("survey");
  const [reviewText, setReviewText] = useState("");

  const saveToSupabase = async (data: { rating: number; highlight: string; comment: string }) => {
    await fetch(`${SUPABASE_URL}/rest/v1/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(data),
    });
  };

  const generate = () => {
    const starText = ["","★☆☆☆☆","★★☆☆☆","★★★☆☆","★★★★☆","★★★★★"][rating] || "";
    const lines = [];
    if (starText) lines.push(`満足度：${starText}`);
    if (highlight) lines.push(`特に${highlight}が良かったです。`);
    if (comment) lines.push(comment);
    lines.push("ごちそうさまでした！おすすめです。");
    setReviewText(lines.join("\n"));
    setScreen("result");
  };
  
  const handlePost = async () => {
    await saveToSupabase({ rating, highlight, comment });
    await navigator.clipboard.writeText(reviewText);
    window.location.href = "https://search.google.com/local/writereview?placeid=ChIJQ_JhX9oPAWARPySrRzKjREU";
  };
 
  return (
    <main style={{ maxWidth: 420, margin: "0 auto", padding: "1rem", fontFamily: "sans-serif" }}>
      {screen === "survey" ? (
        <>
          <p style={{ fontSize: 13, color: "#6b7280" }}>食後のご感想をお聞かせください</p>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>今回の満足度を教えてください</p>
            <div style={{ display: "flex", gap: 8 }}>
              {[1,2,3,4,5].map((v) => (
                <span key={v} onClick={() => setRating(v)} style={{ fontSize: 30, cursor: "pointer", color: v <= rating ? "#f59e0b" : "#d1d5db" }}>★</span>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>一番良かった点はどれですか？（１つ選択）</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["野菜たっぷりで満足感がある","スープが美味しい","麺が美味しい","接客が良い","コスパが良い","提供が早い"].map((item) => (
                <button key={item} onClick={() => setHighlight(item)} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 13, cursor: "pointer", background: highlight === item ? "#dbeafe" : "#f3f4f6", border: highlight === item ? "1px solid #93c5fd" : "1px solid #e5e7eb", color: highlight === item ? "#1d4ed8" : "#374151" }}>{item}</button>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1rem", marginBottom: 12 }}>
            <p style={{ fontWeight: 500, marginBottom: 8 }}>実際に食べた感想を教えてください</p>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="野菜たっぷりでヘルシーなのに満足感がありました！" style={{ width: "100%", boxSizing: "border-box", padding: 8, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 14, minHeight: 72, resize: "none" }} />
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
          
          <a href="https://search.google.com/local/writereview?placeid=ChIJQ_JhX9oPAWARPySrRzKjREU" onClick={handlePost} style={{ display: "block", width: "100%", padding: 13, borderRadius: 8, border: "none", fontSize: 15, cursor: "pointer", background: "#dbeafe", color: "#1d4ed8", fontWeight: 500, marginBottom: 8, textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>
            Googleマップに投稿する ↗
          </a>
          
          <button onClick={() => setScreen("survey")} style={{ width: "100%", padding: 13, borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 15, cursor: "pointer", background: "#fff" }}>
            ← やり直す
          </button>
        </>
      )}
    </main>
  );
}
