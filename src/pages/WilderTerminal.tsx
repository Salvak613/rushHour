import { useState, useEffect } from "react";
import styles from "./WilderTerminal.module.css";

const fakeLogs = [
  "[BOOT] Initializing WILDER Node v3.9",
  "[OK] Neural Grid Online...",
  "[WARNING] Anomaly Detected in Case File #X92F",
  "[ERROR] Subject Profile Not Authorized",
  "[SYS] Clearance Level 7 Required. Override Attempt Detected...",
  "[WILDER] Predictive pattern: 87% chance of hostile intent.",
  "[ANALYZER] LANGUAGE DETECTED: FRENCH",
  `[ERROR] "J'ai tout pété."`,
  "[DATA LEAK] BENJ - JEROME - CHRIS - SALAH - ADRIEN - JORDAN - MAXENCE - DAMIEN",
  "[WILDER] Envoit de votre historique navigateur à votre liste de contact",
  "[SENDING] 23%",
  "[SENDING] 45%",
  "[SENDING] 67%",
    "[SENDING] 89%",
    "[SENDING] 99%",
    "[OK] Envoi terminé.",
    "[LEAK POKE-CLICKER] LE CODE KONAMI PEUT S'AVERER TRES UTILE"
];

export default function BeagleTerminal() {
  const [logIndex, setLogIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (logIndex < fakeLogs.length) {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, fakeLogs[logIndex]]);
        setLogIndex((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [logIndex]);

  return (
    <div className={styles.terminalWrapper}>
      <div className={styles.terminal}>
        {logs.map((line, index) => (
          <div key={index} className={styles.line}>{line}</div>
        ))}
      </div>
    </div>
  );
}
