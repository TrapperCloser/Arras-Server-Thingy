const API_URL = "https://t4mebdah2ksfasgi-c.uvwx.xyz:8443/2222/status";
const canvas = document.querySelector("#player-count-canvas");
const canvasContext = canvas.getContext("2d");

const regions = {
  c: "US Central",
  w: "US West",
  o: "Oceania",
  a: "Asia",
  e: "Europe",
};

const gameModes = [
  // Server instances (added these first)
  { key: "e0", label: "Sandbox Redirect" },
  { key: "e1", label: "Server Instance 1" },
  { key: "e2", label: "Server Instance 2" },
  { key: "e3", label: "Server Instance 3" },
  { key: "e4", label: "Server Instance 4" },
  { key: "e5", label: "Server Instance 5" },
  { key: "e6", label: "Server Instance 6" },
  { key: "e7", label: "Server Instance 7" },
  { key: "e8", label: "Server Instance 8" },
  { key: "e9", label: "Server Instance 9" },
  { key: "ac", label: "Arms Race Clanwars" },
  { key: "af", label: "Arms Race FFA" },
  { key: "am", label: "Arms Race Maze" },
  { key: "am2", label: "Arms Race Maze 2TDM" },
  { key: "am2d", label: "Arms Race Maze 2TDM Duos" },
  { key: "am2c", label: "Arms Race Maze 2TDM CTF" },
  { key: "am3", label: "Arms Race Maze 3TDM" },
  { key: "am3d", label: "Arms Race Maze 3TDM Duos" },
  { key: "am4", label: "Arms Race Maze 4TDM" },
  { key: "am4d", label: "Arms Race Maze 4TDM Duos" },
  { key: "amf", label: "Arms Race Maze FFA" },
  { key: "ams", label: "Arms Race Maze Squads" },
  { key: "a2", label: "Arms Race 2TDM" },
  { key: "a3", label: "Arms Race 3TDM" },
  { key: "a4", label: "Arms Race 4TDM" },
  { key: "ao2", label: "Arms Race Open 2TDM" },
  { key: "ao3", label: "Arms Race Open 3TDM" },
  { key: "ao4", label: "Arms Race Open 4TDM" },
  { key: "aom", label: "Arms Race Open Maze" },
  { key: "aom2", label: "Arms Race Open Maze 2TDM" },
  { key: "am2e", label: "Arms Race Maze 2TDM Elimination" },
  { key: "am3e", label: "Arms Race Maze 3TDM Elimination" },
  { key: "am4e", label: "Arms Race Maze 4TDM Elimination" },
  { key: "aom2e", label: "Arms Race Open Maze 2TDM Elimination" },
  { key: "aom3e", label: "Arms Race Open Maze 3TDM Elimination" },
  { key: "aom4e", label: "Arms Race Open Maze 4TDM Elimination" },
  { key: "apm2", label: "Arms Race Portal Maze 2TDM" },
  { key: "apm3", label: "Arms Race Portal Maze 3TDM" },
  { key: "apm4", label: "Arms Race Portal Maze 4TDM" },
  { key: "as", label: "Arms Race Squads" },
  { key: "ag", label: "Arms Race Growth" },
  { key: "ap", label: "Arms Race Portal" },
  { key: "ad", label: "Armsrace Duos" },
  { key: "amd", label: "Armsrace Maze Duos"},
  { key: "acropolis", label: "Assault Acropolis" },
  { key: "booster", label: "Assault Booster" },
  { key: "branches", label: "Assault Branches" },
  { key: "bunker", label: "Assault Bunker" },
  { key: "line", label: "Assault Line" },
  { key: "stronghold", label: "Assault Stronghold" },
  { key: "trenches", label: "Assault Trenches" },
  { key: "w34betas4test", label: "Beta Sandbox Test" },
  { key: "blackout", label: "Blackout (Event)" },
  { key: "c", label: "Clan Wars" },
  { key: "ctf", label: "Capture the Flag" },
  { key: "d", label: "Domination" },
  { key: "e0z", label: "Sandbox Redirect" },
  { key: "f", label: "FFA" },
  { key: "forge", label: "Forge" },
  { key: "g", label: "Growth" },
  { key: "g2", label: "Growth 2TDM" },
  { key: "gad", label: "Growth Arms Race Duos" },
  { key: "gam2", label: "Growth Arms Race 2TDM Maze" },
  { key: "gam3", label: "Growth Arms Race 3TDM Maze" },
  { key: "gam4", label: "Growth Arms Race 4TDM Maze" },
  { key: "gamd", label: "Growth Arms Race Maze Duos" },
  { key: "gao2", label: "Growth Arms Race Open 2TDM" },
  { key: "gao3", label: "Growth Arms Race Open 3TDM" },
  { key: "gao4", label: "Growth Arms Race Open 4TDM" },
  { key: "gom2", label: "Growth Open Maze 2TDM" },
  { key: "gom3", label: "Growth Open Maze 3TDM" },
  { key: "gom4", label: "Growth Open Maze 4TDM" },
  { key: "ga", label: "Growth Arms Race" },
  { key: "gc", label: "Growth Clanwars" },
  { key: "gf", label: "Growth FFA" },
  { key: "gmf", label: "Growth Maze FFA" },
  { key: "gamf", label: "Growth Armsrace Maze FFA" },
  { key: "gamc", label: "Growth Armsrace Maze Clanwars" },
  { key: "gams", label: "Growth Armsrace Maze Squads" },
  { key: "gamd", label: "Growth Armsrace Maze Duos" },
  { key: "gamp", label: "Growth Armsrace Maze Portal" },
  { key: "gmd", label: "Growth Maze Duos" },
  { key: "gm2", label: "Growth Maze 2TDM" },
  { key: "gm3", label: "Growth Maze 3TDM" },
  { key: "gm4", label: "Growth Maze 4TDM" },
  { key: "go2", label: "Growth Open 2TDM" },
  { key: "go3", label: "Growth Open 3TDM" },
  { key: "go4", label: "Growth Open 4TDM" },
  { key: "grf", label: "Growth Rock FFA" },
  { key: "gmc", label: "Growth Maze Clanwars" },
  { key: "gms", label: "Growth Maze Squads" },
  { key: "gmd", label: "Growth Maze Duos" },
  { key: "gmp", label: "Growth Maze Portal" },
  { key: "gs", label: "Growth Squads" },
  { key: "gd", label: "Growth Duos" },
  { key: "g4", label: "Growth 4TDM" },
  { key: "gz", label: "Growth Sandbox" },
  { key: "gae5spacemf", label: "Growth Armsrace Space Maze FFA" },
  { key: "halloween", label: "Halloween (Event)" },
  { key: "labyrinth", label: "Greedyrinth (Labyrinth)" },
  { key: "limbo", label: "Limbo" },
  { key: "magicm2", label: "Magic Maze 2TDM" },
  { key: "magicm3", label: "Magic Maze 3TDM" },
  { key: "magicm4", label: "Magic Maze 4TDM" },
  { key: "magicmf", label: "Magic Maze FFA" },
  { key: "magicmd", label: "Magic Maze Duos" },
  { key: "magicms", label: "Magic Maze Squads " },
  { key: "magicmc", label: "Magic Maze Clanwars " },
  { key: "manhuntg", label: "Manhunt" },
  { key: "manhuntmf", label: "Manhunt Maze FFA" },
  { key: "marchmadness", label: "March Madness (Event)" },
  { key: "m2", label: "Maze 2TDM" },
  { key: "m2c", label: "Maze 2TDM Capture The Flag" },
  { key: "m2d", label: "Maze 2TDM Domination" },
  { key: "m4", label: "Maze 4TDM" },
  { key: "m4d", label: "Maze 4TDM Domination" },
  { key: "md", label: "Maze Duos" },
  { key: "mf", label: "Maze FFA" },
  { key: "mo3", label: "Maze Open 3TDM" },
  { key: "mo3d", label: "Maze Open 3TDM Domination" },
  { key: "ms", label: "Maze Squads" },
  { key: "classicmf", label: "Classic Maze" },
  { key: "classicf", label: "Classic FFA" },
  { key: "classic2", label: "Classic 2TDM" },
  { key: "classic3", label: "Classic 3TDM" },
  { key: "classic4", label: "Classic 4TDM" },
  { key: "yins4yang", label: "YinYang" },
  { key: "test", label: "Testing" },
  { key: "nexus", label: "Nexus" },
  { key: "o2", label: "Open 2TDM" },
  { key: "o3", label: "Open 3TDM" },
  { key: "o4", label: "Open 4TDM"},
  { key: "om3", label: "Open Maze 3TDM" },
  { key: "om3t", label: "Open Maze 3TDM Tag" },
  { key: "om4", label: "Open Maze 4TDM" },
  { key: "om4t", label: "Open Maze 4TDM Tag" },
  { key: "outbreak", label: "Outbreak" },
  { key: "outbreakmf", label: "Outbreak Maze FFA" },
  { key: "outbreakms", label: "Outbreak Maze Squads" },
  { key: "overgrowthd", label: "Overgrowth Domination" },
  { key: "overgrowth", label: "Overgrowth" },
  { key: "overgrowth2", label: "Overgrowth 2TDM" },
  { key: "overgrowth3", label: "Overgrowth 3TDM" },
  { key: "overgrowth4", label: "Overgrowth 4TDM" },
  { key: "overgrowtho2", label: "Overgrowth Open 2TDM" },
  { key: "overgrowtho3", label: "Overgrowth Open 3TDM" },
  { key: "overgrowtho4", label: "Overgrowth Open 4TDM" },
  { key: "overgrowthm2", label: "Overgrowth Maze 2TDM" },
  { key: "overgrowthm3", label: "Overgrowth Maze 3TDM" },
  { key: "overgrowthm4", label: "Overgrowth Maze 4TDM" },
  { key: "overgrowthom2", label: "Overgrowth Open Maze 2TDM" },
  { key: "overgrowthom3", label: "Overgrowth Open Maze 3TDM" },
  { key: "overgrowthom4", label: "Overgrowth Open Maze 4TDM" },
  { key: "overgrowthc", label: "Overgrowth Clanwars" },
  { key: "overgrowths", label: "Overgrowth Squads" },
  { key: "overgrowthd", label: "Overgrowth Duos" },
  { key: "overgrowthf", label: "Overgrowth FFA" },
  { key: "p2", label: "Portal 2TDM" },
  { key: "p3", label: "Portal 3TDM" },
  { key: "p4", label: "Portal 4TDM" },
  { key: "pm2", label: "Portal Maze 2TDM" },
  { key: "pm3", label: "Portal Maze 3TDM" },
  { key: "pm4", label: "Portal Maze 4TDM" },
  { key: "pumpkinpatch", label: "Pumpkin Patch (Event)" },
  { key: "rf", label: "Rock FFA" },
  { key: "space2", label: "Space 2TDM" },
  { key: "space3", label: "Space 3TDM" },
  { key: "space4", label: "Space 4TDM" },
  { key: "spacemf", label: "Space Maze FFA" },
  { key: "spacem2", label: "Space Maze 2TDM" },
  { key: "spacem3", label: "Space Maze 3TDM" },
  { key: "spacem4", label: "Space Maze 4TDM" },
  { key: "spacemc", label: "Space Maze Clanwars" },
  { key: "spacems", label: "Space Maze Squads" },
  { key: "spacems", label: "Space Maze Duos " },
  { key: "spacem", label: "Space Maze" },
  { key: "spaceo2", label: "Space Open 2TDM" },
  { key: "space3", label: "Space Open 3TDM" },
  { key: "spaceo4", label: "Space Open 4TDM" },
  { key: "tetromino", label: "Tetromino" },
  { key: "s", label: "Squads" },
  { key: "t", label: "Tag" },
  { key: "z", label: "Sandbox" },
  { key: "2", label: "2TDM" },
  { key: "2b", label: "2 Teams Soccer" },
  { key: "2d", label: "2TDM Domination" },
  { key: "2m", label: "Mothership 2TDM" },
  { key: "3d", label: "3TDM Domination" },
  { key: "g3", label: "Growth 3TDM" },
  { key: "4", label: "4TDM" },
  { key: "4m", label: "Mothership 4TDM" },
  { key: "4d", label: "4TDM Domination" },
  { key: "4g", label: "4TDM Grudge Ball" },
  { key: "bastion", label: "Siege Bastion" },
  { key: "blitz", label: "Siege Blitz" },
  { key: "citadel", label: "Siege Citadel" },
  { key: "fortress", label: "Siege Fortress" },
  { key: "mothership", label: "Mothership" },
  { key: "skinwalkers", label: "Skinwalkers" },
  { key: "w33olds5forge", label: "Old Forge" },
  { key: "w33olds9labyrinth", label: "Old Labyrinth" },
  { key: "w33oldscdreadnoughts", label: "Old Dreadnoughts" },
  { key: "w33oldscdreadnoughts2", label: "Old Dreadnoughts 2TDM" },
  { key: "w33oldscdreadnoughts4", label: "Old Dreadnoughts 4TDM" },
  { key: "w33oldscdreadnoughtso3", label: "Old Dreadnoughts Open 3TDM" },
  { key: "w33oldscdreadnoughtso4", label: "Old Dreadnoughts Open 4TDM" },
];

const sortedModes = [...gameModes].sort((a, b) => {
  const aIsInstance = a.key.match(/^e[0-9]$/);
  const bIsInstance = b.key.match(/^e[0-9]$/);
  
  if (aIsInstance && !bIsInstance) return -1;
  if (!aIsInstance && bIsInstance) return 1;
  
  return b.key.length - a.key.length;
});

const unknownLogged = new Set();

function extractGameModeFromCode(code = "") {
  if (!code || typeof code !== "string") return "Unknown";
  const lower = code.toLowerCase();

  const exactMatch = sortedModes.find(m => lower === m.key.toLowerCase());
  if (exactMatch) return exactMatch.label;

  // Handle server instance prefixes (e0-e9)
  const instanceMatch = lower.match(/^(e[0-9])(.*)/);
  if (instanceMatch) {
    const [_, instanceCode, modeCode] = instanceMatch;
    const instanceLabel = gameModes.find(m => m.key.toLowerCase() === instanceCode)?.label || `Instance ${instanceCode[1]}`;
    
    if (!modeCode) return instanceLabel;

    const modeMatch = sortedModes.find(m => 
      modeCode === m.key.toLowerCase() || 
      modeCode.startsWith(m.key.toLowerCase())
    );
    
    if (modeMatch) {
      return `${instanceLabel} (${modeMatch.label})`;
    }
    
    // Try to parse the mode code character by character
    const parsedMode = parseModeCode(modeCode);
    if (parsedMode) {
      return `${instanceLabel} (${parsedMode})`;
    }
    
    return `${instanceLabel} (Unknown Mode)`; 
  }
  
  const parsedMode = parseModeCode(lower);
  if (parsedMode) return parsedMode;

  return "Unknown";
}

function parseModeCode(code) {

  const exactMatch = sortedModes.find(m => code === m.key.toLowerCase());
  if (exactMatch) return exactMatch.label;

  for (const mode of sortedModes) {
    if (code.includes(mode.key.toLowerCase())) {
      return mode.label;
    }
  }

  const modifierMap = {
    g: "Growth", a: "Arms Race", p: "Portal", o: "Open", m: "Maze"
  };
  const teamMap = {
    f: "FFA", d: "Duos", s: "Squads", c: "Clan Wars",
    1: "1TDM", 2: "2TDM", 3: "3TDM", 4: "4TDM"
  };
  const winMap = {
    d: "Domination", m: "Mothership", a: "Assault",
    t: "Tag", c: "CTF", z: "Sandbox"
  };

  const chars = code.replace(/[^a-z0-9]/gi, "").split("");
  const mods = [];
  let team = null;
  let win = null;

  for (const char of chars) {
    if (!team && teamMap[char]) team = teamMap[char];
    else if (!win && winMap[char]) win = winMap[char];
    else if (modifierMap[char]) mods.push(modifierMap[char]);
  }

  return [...mods, team, win].filter(Boolean).join(" ") || null;
}
  const fallbackMatch = sortedModes.find((m) =>
    lower.includes(m.key.toLowerCase())
  );
  if (fallbackMatch) return fallbackMatch.label;

  if (!gameModes.some((g) => lower.includes(g.key.toLowerCase()))) {
    if (!unknownLogged.has(lower)) {
      console.warn("[UNRECOGNIZED MODE]", lower);
      unknownLogged.add(lower);
    }
  }

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
  if (mspt >= 30) return "mspt-bad";
  if (mspt >= 15) return "mspt-mid";
  return "mspt-good";
}

function filterTable() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const tableBody = document.getElementById("serverTableBody");

  let totalPlayers = 0;

  [...tableBody.rows].forEach((row) => {
    const name = row.getAttribute("data-name") || "";
    const region = row.getAttribute("data-region") || "";
    const mode = row.getAttribute("data-mode") || "";

    const nameMatches = name.includes(search);
    const regionMatches = regionFilter === "all" || region === regionFilter;
    const modeMatches = modeFilter === "all" || mode.includes(modeFilter);

    const visible = nameMatches && regionMatches && modeMatches;
    row.style.display = visible ? "" : "none";

    if (visible) {
      totalPlayers += parseInt(row.getAttribute("data-players")) || 0;
    }
  });

  canvas.style.display = "none";

  document.getElementById("total-players").innerHTML = 
    `<i class="fas fa-users"></i> ${(regionFilter === "all" && modeFilter === "all"
      ? "Total players: "
      : "Filtered players: ") + totalPlayers}`;
}

async function fetchAndDisplay() {
  const tableBody = document.getElementById("serverTableBody");
  try {
    const resServers = await fetch(API_URL);
    if (!resServers.ok) {
      throw new Error(`HTTP error! status: ${resServers.status}`);
    }
    const jsonServers = await resServers.json();

    const onlineServers = jsonServers && jsonServers.status 
      ? Object.values(jsonServers.status).filter(server => server) 
      : [];
    
    let totalPlayers = 0;
    let oldDreadnoughtsPlayers = 0;

    tableBody.innerHTML = "";
    
    if (onlineServers && onlineServers.length) {
      onlineServers.sort((a, b) => {
        const aValue = a[currentSorting] || 0;
        const bValue = b[currentSorting] || 0;
        return bValue - aValue;
      });
    }

    onlineServers.forEach((server) => {
      if (!server) return;
      
      const modeRaw = [server.mode, server.code].filter(Boolean).join(" ");
      const gameMode = extractGameModeFromCode(modeRaw);

      totalPlayers += server.clients ?? 0;
      if (gameMode.match("Old Dreadnoughts")) {
        oldDreadnoughtsPlayers += server.clients ?? 0;
      }
    });

    const serverGrid = document.getElementById("server-grid");
    serverGrid.innerHTML = "";

    onlineServers.forEach((server) => {
      if (!server) return;
      
      const mspt = server.mspt || 0;
      const players = server.clients || 0;
      
      const dot = document.createElement("div");
      dot.className = "server-dot";
      
      // Determine health status
      if (mspt >= 30) {
        dot.classList.add("bad");
      } else if (mspt >= 15) {
        dot.classList.add("medium");
      } else {
        dot.classList.add("good");
      }
      
      dot.setAttribute("data-tooltip", `${server.name || 'Unknown'} | ${players} players | ${mspt.toFixed(1)} mspt`);
      
      // Size based on player count (bigger = more players)
      const size = 12 + Math.min(players * 2, 12);
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      
      serverGrid.appendChild(dot);
    });

    onlineServers.forEach((server) => {
      if (!server) return;
      
      const row = document.createElement("tr");
      const regionCode = server.name?.[0] || "";
      const region = regions[regionCode] || "Unknown";
      const mspt = (server.mspt || 0).toFixed(1);
      const msptClass = getMsptClass(server.mspt || 0);
      const modeRaw = [server.mode, server.code].filter(Boolean).join(" ");
      const gameMode = extractGameModeFromCode(modeRaw);
      const isOldDreadnoughts = gameMode.match("Old Dreadnoughts");

      row.setAttribute("data-name", (server.name || '').toLowerCase());
      row.setAttribute("data-mode", gameMode.toLowerCase());
      row.setAttribute("data-region", region.toLowerCase());
      row.setAttribute("data-players", server.clients || 0);
      row.innerHTML = `
        <td><a href="https://arras.io/#${
          server.name || ''
        }" class="server-redirect"><i class="fas fa-server"></i> #${server.name || '?'}</a></td>
        <td><i class="fas fa-users"></i> ${server.clients || 0} ${
        isOldDreadnoughts ? `(${oldDreadnoughtsPlayers} total)` : ""
      }</td>
        <td><i class="fas fa-clock"></i> ${formatUptime(server.uptime || 0)}</td>
        <td class="${msptClass}" title="Milliseconds Per Tick"><i class="fas fa-tachometer-alt"></i> ${mspt} mspt</td>
        <td><i class="fas fa-map-marker-alt"></i> ${region}</td>
        <td title="${server.mode || server.code || "Unknown"}"><i class="fas fa-gamepad"></i> ${gameMode}</td>
        <td><i class="fas fa-plug"></i> ${server.host && server.host.split ? server.host.split("/")[1] : "?"}</td>
      `;
      tableBody.appendChild(row);
    });

    document.getElementById("total-players").innerHTML = 
      `<i class="fas fa-users"></i> ${(regionFilter === "all" && modeFilter === "all"
        ? "Total players: "
        : "Filtered players: ") + totalPlayers}`;
    document.getElementById("last-updated").innerHTML = 
      `<i class="fas fa-clock"></i> Last updated: ${new Date().toLocaleTimeString()}`;
    filterTable();
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="8"><i class="fas fa-exclamation-triangle"></i> Error loading data: ${err.message}</td></tr>`;
    console.error("Failed to fetch server status:", err);
  }
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.region) {
      document
        .querySelectorAll(".filter-btn[data-region]")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      regionFilter = btn.dataset.region;
      filterTable();
    }

    if (btn.dataset.mode) {
      document
        .querySelectorAll(".filter-btn[data-mode]")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      modeFilter = btn.dataset.mode;
      filterTable();
    }

    if (btn.dataset.sorting) {
      document
        .querySelectorAll(".filter-btn[data-sorting]")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentSorting = btn.dataset.sorting;
      fetchAndDisplay();
    }
  });
});

function toggleTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
  } else if (theme === 'dark') {
    document.body.classList.remove('light-theme');
    document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    // Toggle based on current state
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.body.classList.add('light-theme');
      document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
    }
  }
}

document.getElementById("searchInput").addEventListener("input", function(e) {
  if (e.target.value.toLowerCase() === "$toggle-light") {
    toggleTheme('light');
    e.target.value = "";
    filterTable();
  } else if (e.target.value.toLowerCase() === "$toggle-dark") {
    toggleTheme('dark');
    e.target.value = "";
    filterTable();
  } else {
    filterTable();
  }
});

document.getElementById('themeToggle').addEventListener('click', function() {
  toggleTheme();
});

fetchAndDisplay();
setInterval(fetchAndDisplay, 3000);
