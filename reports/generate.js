const { generate } = require('multiple-cucumber-html-reporter');
const path = require('path');
const fs   = require('fs');

// ─── Timestamp para el backup ─────────────────────────────────────────────────

const ahora = new Date();
const fecha = [
  ahora.getFullYear(),
  String(ahora.getMonth() + 1).padStart(2, '0'),
  String(ahora.getDate()).padStart(2, '0')
].join('-');
const hora = [
  String(ahora.getHours()).padStart(2, '0'),
  String(ahora.getMinutes()).padStart(2, '0'),
  String(ahora.getSeconds()).padStart(2, '0')
].join('-');
const timestamp = `${fecha}_${hora}`;

// ─── Generación del reporte HTML ──────────────────────────────────────────────

generate({
  jsonDir: path.resolve('./reports'),
  reportPath: path.resolve('./reports/html'),
  openReportInBrowser: true,
  saveCollectedJSON: false,
  metadata: {
    browser: {
      name: process.env.BROWSER || 'chromium',
      version: 'Latest'
    },
    device: 'Desktop',
    platform: {
      name: 'Windows',
      version: '11'
    }
  },
  customData: {
    title: 'Reporte de Ejecución de Pruebas',
    data: [
      { label: 'Proyecto',   value: 'Sauce Demo Automation' },
      { label: 'Framework',  value: 'Playwright + Cucumber' },
      { label: 'Patrón',     value: 'Screenplay-Inspired' },
      { label: 'Fecha',      value: `${fecha} ${hora.replace(/-/g, ':')}` }
    ]
  }
});

console.log(`\nReporte HTML generado en: reports/html/index.html`);

// ─── Backup del reporte ───────────────────────────────────────────────────────

const origenHtml = path.resolve('./reports/html');
const destino    = path.resolve('./reports/backup', timestamp);

try {
  if (fs.existsSync(origenHtml)) {
    fs.mkdirSync(destino, { recursive: true });
    fs.cpSync(origenHtml, destino, { recursive: true });
    console.log(`Backup guardado en:      reports/backup/${timestamp}/\n`);
  }
} catch (err) {
  console.warn(`Advertencia: no se pudo guardar el backup — ${err.message}\n`);
}
