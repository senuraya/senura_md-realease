const fs = require('fs');
const fetch = require('node-fetch'); // npm i node-fetch@2

let registry = [];

// Add a meta entry
function registerMeta(info, filePath) {
  registry.push({
    pattern: info.pattern,
    alias: info.alias || [],
    desc: info.desc || "",
    category: info.category || "misc",
    dontAddCommandList: info.dontAddCommandList || false,
    filePath
  });
}

// Save current registry to JSON file
function saveRegistryToFile(filePath = 'registry.json') {
  fs.writeFileSync(filePath, JSON.stringify(registry, null, 2));
  console.log('Registry saved to', filePath);
}

// Load registry from a JSON URL (raw GitHub link)
async function loadRegistryFromURL() {
  let url = "https://gitlab.com/janith20062006/anju_xpro/-/raw/main/registry.json"
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch registry: ' + res.statusText);
  return await res.json();
  console.log('Registry loaded from URL, entries:', registry.length);
}

// Get current registry
async function getRegistry() {
  let registry = await loadRegistryFromURL();
  return registry;
}

module.exports = { registerMeta, getRegistry, saveRegistryToFile, loadRegistryFromURL };
