import { useState, useRef } from "react";

const styles = {
  app: { minHeight: "100vh", background: "#0a0a0f", color: "#f0f0f8", fontFamily: "'DM Mono', 'Fira Code', monospace", padding: "0", margin: "0" },
  header: { borderBottom: "1px solid #2a2a3d", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#12121a" },
  logo: { display: "flex", alignItems: "center", gap: "10px" },
  logoMark: { width: "32px", height: "32px", background: "#00e5a0", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "bold", color: "#0a0a0f" },
  logoText: { fontSize: "18px", fontWeight: "700", letterSpacing: "0.05em", color: "#f0f0f8" },
  badge: { fontSize: "10px", background: "#00e5a020", color: "#00e5a0", border: "1px solid #00e5a040", padding: "2px 8px", borderRadius: "20px", letterSpacing: "0.1em" },
  main: { maxWidth: "900px", margin: "0 auto", padding: "48px 24px" },
  hero: { textAlign: "center", marginBottom: "48px" },
  heroTitle: { fontSize: "42px", fontWeight: "800", lineHeight: "1.15", marginBottom: "16px", letterSpacing: "-0.02em", fontFamily: "'DM Serif Display', Georgia, serif" },
  heroAccent: { color: "#00e5a0" },
  heroSub: { fontSize: "16px", color: "#8888aa", maxWidth: "480px", margin: "0 auto", lineHeight: "1.6" },
  uploadZone: { border: "2px dashed #2a2a3d", borderRadius: "16px", padding: "48px 32px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", background: "#12121a", marginBottom: "24px" },
  uploadZoneActive: { border: "2px dashed #00e5a0", background: "#00e5a020" },
  uploadIcon: { fontSize: "40px", marginBottom: "16px" },
  uploadTitle: { fontSize: "18px", fontWeight: "600", marginBottom: "8px" },
  uploadSub: { fontSize: "13px", color: "#8888aa" },
  orDivider: { display: "flex", alignItems: "center", gap: "16px", margin: "24px 0", color: "#4a4a6a", fontSize: "12px", letterSpacing: "0.1em" },
  dividerLine: { flex: 1, height: "1px", background: "#2a2a3d" },
  textarea: { width: "100%", minHeight: "160px", background: "#12121a", border: "1px solid #2a2a3d", borderRadius: "12px", color: "#f0f0f8", fontFamily: "'DM Mono', monospace", fontSize: "13px", padding: "16px", resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: "1.6", transition: "border-color 0.2s" },
  contextInput: { width: "100%", background: "#12121a", border: "1px solid #2a2a3d", borderRadius: "12px", color: "#f0f0f8", fontFamily: "'DM Mono', monospace", fontSize: "13px", padding: "14px 16px", outline: "none", boxSizing: "border-box", marginBottom: "16px", transition: "border-color 0.2s" },
  label: { display: "block", fontSize: "11px", letterSpacing: "0.12em", color: "#8888aa", marginBottom: "8px", textTransform: "uppercase" },
  analyzeBtn: { width: "100%", padding: "16px", background: "#00e5a0", color: "#0a0a0f", border: "none", borderRadius: "12px", fontSize: "15px", fontWeight: "700", fontFamily: "'DM Mono', monospace", cursor: "pointer", letterSpacing: "0.05em", marginTop: "16px", transition: "all 0.2s" },
  analyzeBtnDisabled: { opacity: 0.4, cursor: "not-allowed" },
  loadingWrap: { textAlign: "center", padding: "48px" },
  spinner: { width: "40px", height: "40px", border: "3px solid #2a2a3d", borderTop: "3px solid #00e5a0", borderRadius: "50%", margin: "0 auto 20px", animation: "spin 0.8s linear infinite" },
  loadingText: { color: "#8888aa", fontSize: "14px" },
  resultsWrap: { marginTop: "40px" },
  resultsHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" },
  resultsTitle: { fontSize: "13px", letterSpacing: "0.12em", color: "#00e5a0", textTransform: "uppercase" },
  resetBtn: { fontSize: "12px", color: "#8888aa", background: "none", border: "1px solid #2a2a3d", borderRadius: "8px", padding: "6px 14px", cursor: "pointer", fontFamily: "'DM Mono', monospace", transition: "all 0.2s" },
  card: { background: "#12121a", border: "1px solid #2a2a3d", borderRadius: "14px", padding: "24px", marginBottom: "16px" },
  cardTitle: { fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" },
  cardContent: { fontSize: "14px", lineHeight: "1.8", color: "#f0f0f8", whiteSpace: "pre-wrap" },
  sampleBtn: { background: "none", border: "1px solid #2a2a3d", borderRadius: "8px", color: "#8888aa", fontSize: "12px", padding: "8px 14px", cursor: "pointer", fontFamily: "'DM Mono', monospace", transition: "all 0.2s", marginRight: "8px", marginBottom: "8px" },
  sampleRow: { marginBottom: "24px" },
  errorCard: { background: "#1a0a0f", border: "1px solid #ff4d6a40", borderRadius: "14px", padding: "20px 24px", color: "#ff4d6a", fontSize: "13px", marginTop: "16px" },
};

const SAMPLE_DATASETS = {
  "Freelance Revenue": `Month,Revenue,Clients,Hours,Expenses\nJan,4200,3,68,820\nFeb,3800,2,55,710\nMar,5100,4,80,930\nApr,4700,3,72,880\nMay,6200,5,95,1100\nJun,5800,4,88,1020\nJul,4100,3,65,760\nAug,3600,2,52,690\nSep,5500,4,84,980\nOct,6800,5,102,1240\nNov,7200,6,108,1380\nDec,6500,5,98,1190`,
  "Client Project Hours": `Project,Client,Hours_Billed,Hours_Actual,Rate,Status\nWebsite Redesign,Acme Corp,40,52,120,Complete\nSEO Audit,Blue Sky Co,20,18,95,Complete\nBrand Strategy,Novo Labs,35,35,150,Active\nContent Calendar,TechFlow,15,22,80,Active\nAnalytics Setup,Bright Path,25,20,130,Complete\nSocial Campaign,Urban Goods,30,38,90,On Hold`,
  "Consulting Pipeline": `Lead,Source,Value,Stage,Days_In_Stage,Probability\nApex Media,Referral,8500,Proposal,12,70\nGridWorks,LinkedIn,3200,Discovery,5,40\nSolana Health,Website,12000,Negotiation,8,85\nTrueNorth Co,Referral,5500,Proposal,18,65\nBlueRidge Inc,Cold Outreach,2800,Discovery,3,25\nNimbus Digital,Referral,9000,Closed Won,0,100`,
};

export default function AnalystIQ() {
  const [csvText, setCsvText] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setCsvText(e.target.result);
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const analyze = async () => {
    if (!csvText.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Now calls YOUR backend, not Anthropic directly — API key is safe
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvText, context }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      const text = data.result || "";
      const sections = {};
      const sectionNames = ["SUMMARY", "KEY FINDINGS", "RED FLAGS", "OPPORTUNITIES", "CLIENT-READY INSIGHT"];
      sectionNames.forEach((name) => {
        const regex = new RegExp(`## ${name}\\n([\\s\\S]*?)(?=## [A-Z]|$)`);
        const match = text.match(regex);
        if (match) sections[name] = match[1].trim();
      });

      setResult(sections);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sectionIcons = { "SUMMARY": "📊", "KEY FINDINGS": "🔍", "RED FLAGS": "⚠️", "OPPORTUNITIES": "🚀", "CLIENT-READY INSIGHT": "✉️" };
  const sectionColors = { "SUMMARY": "#00e5a0", "KEY FINDINGS": "#4d9fff", "RED FLAGS": "#ff4d6a", "OPPORTUNITIES": "#ffb340", "CLIENT-READY INSIGHT": "#00e5a0" };

  return (
    <div style={styles.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Serif+Display&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .result-card { animation: fadeUp 0.4s ease forwards; }
        .analyze-btn:hover:not(:disabled) { background: #00ffb3 !important; transform: translateY(-1px); }
        .reset-btn:hover { color: #f0f0f8 !important; border-color: #8888aa !important; }
        .sample-btn:hover { color: #00e5a0 !important; border-color: #00e5a0 !important; }
        textarea:focus, input:focus { border-color: #00e5a0 !important; }
      `}</style>

      <div style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoMark}>A</div>
          <span style={styles.logoText}>AnalystIQ</span>
        </div>
        <span style={styles.badge}>BETA</span>
      </div>

      <div style={styles.main}>
        {!result && !loading && (
          <>
            <div style={styles.hero}>
              <div style={styles.heroTitle}>Your data,<br /><span style={styles.heroAccent}>analyzed in seconds.</span></div>
              <p style={styles.heroSub}>Upload client data or paste a CSV. Get instant insights, red flags, and a client-ready report — powered by AI.</p>
            </div>

            <div style={styles.sampleRow}>
              <div style={styles.label}>Try a sample dataset</div>
              {Object.keys(SAMPLE_DATASETS).map((name) => (
                <button key={name} className="sample-btn" style={styles.sampleBtn} onClick={() => { setCsvText(SAMPLE_DATASETS[name]); setContext(""); }}>{name}</button>
              ))}
            </div>

            <div style={{ ...styles.uploadZone, ...(dragging ? styles.uploadZoneActive : {}) }}
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}>
              <div style={styles.uploadIcon}>📂</div>
              <div style={styles.uploadTitle}>Drop a CSV file here</div>
              <div style={styles.uploadSub}>or click to browse your files</div>
              <input ref={fileInputRef} type="file" accept=".csv,.txt" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
            </div>

            <div style={styles.orDivider}>
              <div style={styles.dividerLine} />OR PASTE DATA BELOW<div style={styles.dividerLine} />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={styles.label}>CSV / Raw Data</label>
              <textarea style={styles.textarea} value={csvText} onChange={(e) => setCsvText(e.target.value)} placeholder={"Paste your CSV data here...\n\nMonth,Revenue,Clients\nJan,4200,3\nFeb,3800,2"} />
            </div>

            <div>
              <label style={styles.label}>Business Context (optional)</label>
              <input style={styles.contextInput} value={context} onChange={(e) => setContext(e.target.value)} placeholder="e.g. This is Q1-Q4 revenue data for a freelance design studio..." />
            </div>

            <button className="analyze-btn" style={{ ...styles.analyzeBtn, ...(!csvText.trim() ? styles.analyzeBtnDisabled : {}) }} onClick={analyze} disabled={!csvText.trim()}>
              ⚡ Analyze Data
            </button>
          </>
        )}

        {loading && (
          <div style={styles.loadingWrap}>
            <div style={styles.spinner} />
            <div style={styles.loadingText}>Analyzing your data...</div>
          </div>
        )}

        {error && <div style={styles.errorCard}>⚠ {error}</div>}

        {result && (
          <div style={styles.resultsWrap}>
            <div style={styles.resultsHeader}>
              <span style={styles.resultsTitle}>Analysis Complete</span>
              <button className="reset-btn" style={styles.resetBtn} onClick={() => { setResult(null); setCsvText(""); setContext(""); setError(null); }}>← New Analysis</button>
            </div>
            {Object.entries(result).map(([section, content], i) => (
              <div key={section} className="result-card" style={{ ...styles.card, animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                <div style={{ ...styles.cardTitle, color: sectionColors[section] }}>
                  <span>{sectionIcons[section]}</span>{section}
                </div>
                <div style={styles.cardContent}>{content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
