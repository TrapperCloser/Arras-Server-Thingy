const API_URL = "https://t4mebdah2ksfasgi.uvwx.xyz:2222/status";
const regions = {
  c: "US Central",
  w: "US West",
  o: "Oceania",
  a: "Asia",
  e: "Europe",
};

const gameModes = [
  { key: "w33olds9labyrinth", label: "Old Dv1 Labyrinth" },
  { key: "w33oldscdreadnoughtso3", label: "Old Dreadnoughts Open 3TDM" },
  { key: "w33oldscdreadnoughts4", label: "Old Dreadnoughts 4TDM" },
  { key: "w33oldscdreadnoughtso4", label: "Old Dreadnoughts Open 4TDM" },
  { key: "w33oldscdreadnoughts2", label: "Old Dreadnoughts 2TDM" },
  { key: "w33oldscdreadnoughts", label: "Old Dreadnoughts" },
  { key: "w33olds5forge", label: "Old Dv1 Forge" },
  { key: "m4d", label: "Maze 4TDM Domination" },
  { key: "m4", label: "Maze 4TDM" },
  { key: "m2d", label: "Maze 2TDM Domination" },
  { key: "am2d", label: "Armsrace Maze 2TDM Domination" },
  { key: "am4d", label: "Armsrace Maze 2TDM Domination" },
  { key: "m2", label: "Maze 2TDM" },
  { key: "mo3d", label: "Maze Open 3TDM Domination" },
  { key: "mo3", label: "Maze Open 3TDM" },
  { key: "ac", label: "Armsrace Clanwars" },
  { key: "am4", label: "Armsrace Maze 4TDM" },
  { key: "am2", label: "Armsrace Maze 2TDM" },
  { key: "am", label: "Armsrace Maze" },
  { key: "ams", label: "Armsrace Maze Squads" },
  { key: "aom", label: "Armsrace Open Maze" },
  { key: "ao3", label: "Armsrace Open 3TDM" },
  { key: "a4", label: "Armsrace 4TDM" },
  { key: "a2", label: "Armsrace 2TDM" },
  { key: "af", label: "Armsrace FFA" },
  { key: "apm4", label: "what the fuck is this game mode" },
  { key: "bastion", label: "Siege Bastion" },
  { key: "blitz", label: "Siege Blitz" },
  { key: "branches", label: "Assault Branches" },
  { key: "bunker", label: "Assault Bunker" },
  { key: "booster", label: "Assault Booster" },
  { key: "c", label: "Clan Wars" },
  { key: "citadel", label: "Siege Citadel" },
  { key: "ctf", label: "Capture the Flag" },
  { key: "d", label: "Domination" },
  { key: "f", label: "FFA" },
  { key: "forge", label: "Forge" },
  { key: "fortress", label: "Siege Fortress" },
  { key: "g", label: "Growth" },
  { key: "g2", label: "Growth 2TDM" },
  { key: "ga", label: "Growth Armsrace" },
  { key: "go2", label: "Growth Open 2TDM" },
  { key: "gam2", label: "Growth Armsrace 2TDM Maze" },
  { key: "gm2", label: "Growth Maze 2TDM" },
  { key: "labyrinth", label: "Greedyrinth (Labyrinth)" },
  { key: "limbo", label: "Limbo" },
  { key: "line", label: "Assault Line" },
  { key: "manhuntg", label: "Manhunt" },
  { key: "magicmf", label: "Magic Maze FFA" },
  { key: "magicm2", label: "Magic Maze 2TDM" },
  { key: "magicm4", label: "Magic Maze 4TDM" },
  { key: "mf", label: "Maze FFA" },
  { key: "mothership", label: "Mothership" },
  { key: "nexus", label: "Nexus" },
  { key: "o", label: " Open 3TDM" },
  { key: "om3", label: "Open Maze 3TDM" },
  { key: "om4", label: "Open Maze 4TDM" },
  { key: "om3t", label: "Open Maze 3TDM Tag" },
  { key: "om4t", label: "Open Maze 4TDM Tag" },
  { key: "outbreak", label: "Outbreak" },
  { key: "outbreakmf", label: "Outbreak Maze FFA" },
  { key: "outbreakms", label: "Outbreak Maze Squads" },
  { key: "overgrowth", label: "Overgrowth" },
  { key: "overgrowthf", label: "Overgrowth FFA" },
  { key: "overgrowth2", label: "Overgrowth 2TDM" },
  { key: "overgrowth4", label: "Overgrowth 4TDM" },
  { key: "skinwalkers", label: "Skinwalkers" },
  { key: "stronghold", label: "Assault Stronghold" },
  { key: "s", label: "Squads" },
  { key: "t", label: "Tag" },
  { key: "test", label: "Testing" },
  { key: "z", label: "Sandbox" },
  { key: "2", label: "2TDM" },
  { key: "4", label: "4TDM" },
];

const sortedModes = gameModes.sort((a, b) => b.key.length - a.key.length);

function extractGameModeFromCode(code = "") {
  if (!code || typeof code !== "string") return "Unknown";
  const lower = code.toLowerCase();
  console.debug("[Mode Debug] Input:", lower);

  // First: exact match
  for (const mode of sortedModes) {
    if (lower === mode.key.toLowerCase()) return mode.label;
  }

  // Second: token match (split by dash/underscore/number boundaries)
  const tokens = lower.split(/[^a-z0-9]+/i);
  for (const token of tokens) {
    for (const mode of sortedModes) {
      if (token === mode.key.toLowerCase()) return mode.label;
    }
  }

  // Third: regex match for known key inside any part of the string
  for (const mode of sortedModes) {
    const regex = new RegExp(`(?:^|[^a-z0-9])${mode.key.toLowerCase()}(?:[^a-z0-9]|$)`);
    if (regex.test(lower)) return mode.label;
  }

  // Special handling: fallback for known static suffixes
  if (lower.includes("labyrinth")) return "Greedyrinth (Labyrinth)";
  if (lower.includes("dreadnoughts")) return "Old Dreadnoughts";
  if (lower.includes("nexus")) return "Nexus";
  if (lower.includes("blitz")) return "Siege Blitz";
  if (lower.includes("fortress")) return "Siege Fortress";
  if (lower.includes("booster")) return "Assault Booster";
  if (lower.includes("eye")) return "Assault Eye";

  // Fourth: dynamic fallback (last resort)
  const modifierMap = {
    g: "Growth",
    a: "Arms Race",
    p: "Portal",
    o: "Open",
    m: "Maze",
  };
  const teamMap = {
    f: "FFA",
    d: "Duos",
    s: "Squads",
    c: "Clan Wars",
    1: "1TDM",
    2: "2TDM",
    3: "3TDM",
    4: "4TDM",
  };
  const winMap = {
    d: "Domination",
    m: "Mothership",
    a: "Assault",
    s: "Siege",
    t: "Tag",
    p: "Pandemic",
    b: "Soccer",
    g: "Grudge Ball",
    e: "Elimination",
    c: "Capture the Flag",
    z: "Sandbox",
  };

  const chars = lower.replace(/[^a-z0-9]/gi, "").split("");
  const mods = [];
  let team = null;
  let win = null;

  for (const char of chars) {
    if (!team && teamMap[char]) {
      team = teamMap[char];
    } else if (!win && winMap[char]) {
      win = winMap[char];
    } else if (modifierMap[char] && !mods.includes(modifierMap[char])) {
      mods.push(modifierMap[char]);
    }
  }

  const dynamicLabel = [...mods, team, win].filter(Boolean).join(" ");
  const fallbackMatch = sortedModes.find((m) =>
    lower.includes(m.key.toLowerCase())
  );
  if (fallbackMatch) return fallbackMatch.label;
  return dynamicLabel || "Unknown";
}

function formatUptime(seconds) {
  if (seconds < 3600)
    return `${Math.floor(seconds / 60)}m ${Math.floor(seconds % 60)}s`;
  return `${Math.floor(seconds / 3600)}h ${
    Math.floor(seconds / 60) % 60
  }m ${Math.floor(seconds % 60)}s`;
}

function getMsptClass(mspt) {
  if (mspt >= 35) return "mspt-bad";
  if (mspt >= 20) return "mspt-mid";
  return "mspt-good";
}

async function fetchAndDisplay() {
  const tableBody = document.getElementById("serverTableBody");
  try {
    const res = await fetch(API_URL);
    const json = await res.json();
    const onlineServers = Object.values(json.status || {});
    let totalPlayers = 0;

    tableBody.innerHTML = "";
    onlineServers.sort((a, b) => b.clients - a.clients);

    onlineServers.forEach((server) => {
      const row = document.createElement("tr");
      const regionCode = server.name?.[0] || "";
      const region = regions[regionCode] || "Unknown";
      const mspt = (server.mspt || 0).toFixed(1);
      const msptClass = getMsptClass(server.mspt || 0);
      const modeRaw = [server.mode, server.code].filter(Boolean).join(" ");
      const gameMode = extractGameModeFromCode(modeRaw);

      totalPlayers += server.clients ?? 0;
      row.setAttribute("data-name", server.name.toLowerCase());
      row.innerHTML = `
        <td>#${server.name}</td>
        <td>${server.clients}</td>
        <td>${formatUptime(server.uptime)}</td>
        <td class="${msptClass}" title="Milliseconds Per Tick">${mspt} mspt</td>
        <td>${region}</td>
        <td title="${server.mode || server.code || "Unknown"}">${gameMode}</td>
        <td>${server.port ? server.port : "?"}</td>
        <td>${server.type ?? "—"}</td>
      `;
      tableBody.appendChild(row);
    });

    document.getElementById("total-players").textContent = totalPlayers;
    document.getElementById(
      "last-updated"
    ).textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    filterTable();
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="8">Error loading data</td></tr>`;
    console.error("Failed to fetch server status:", err);
  }
}

function filterTable() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const tableBody = document.getElementById("serverTableBody");
  [...tableBody.rows].forEach((row) => {
    row.style.display = row.getAttribute("data-name").includes(search)
      ? ""
      : "none";
  });
}

document.getElementById("searchInput").addEventListener("input", filterTable);
fetchAndDisplay();
setInterval(fetchAndDisplay, 5000);
