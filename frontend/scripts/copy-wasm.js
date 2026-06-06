const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, '..', 'out');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const wasmSourceDir = path.join(__dirname, '..', 'node_modules', 'tree-sitter-wasms', 'out');
const treeSitterWasm = path.join(__dirname, '..', 'node_modules', 'web-tree-sitter', 'tree-sitter.wasm');

if (fs.existsSync(treeSitterWasm)) {
  fs.copyFileSync(treeSitterWasm, path.join(destDir, 'tree-sitter.wasm'));
  console.log('Copied: tree-sitter.wasm');
} else {
  console.warn('Warning: tree-sitter.wasm not found');
}

if (fs.existsSync(wasmSourceDir)) {
  const files = fs.readdirSync(wasmSourceDir).filter(f => f.endsWith('.wasm'));
  for (const file of files) {
    fs.copyFileSync(path.join(wasmSourceDir, file), path.join(destDir, file));
    console.log(`Copied: ${file}`);
  }
} else {
  console.warn('Warning: tree-sitter-wasms/out not found');
}
