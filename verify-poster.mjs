import { chromium } from 'playwright';

const HTML_PATH = process.argv[2] || 'file:///Users/gaoyuan/tmp/0528/t1/taste-output/r2-40tools-poster.html';
const W = 1080, H = 1440;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });

const errors = [];
page.on('pageerror', err => errors.push(err.message));

await page.goto(HTML_PATH, { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(1000);

const result = await page.evaluate(([W, H]) => {
  const issues = [];
  const body = document.body;

  // 1. Body scroll overflow check
  if (body.scrollHeight > body.clientHeight + 2) {
    issues.push({
      type: 'BODY_OVERFLOW_Y',
      severity: 'FATAL',
      detail: `body scrollHeight=${body.scrollHeight} > clientHeight=${body.clientHeight}`,
      overflowBy: body.scrollHeight - body.clientHeight
    });
  }
  if (body.scrollWidth > body.clientWidth + 2) {
    issues.push({
      type: 'BODY_OVERFLOW_X',
      severity: 'FATAL',
      detail: `body scrollWidth=${body.scrollWidth} > clientWidth=${body.clientWidth}`,
      overflowBy: body.scrollWidth - body.clientWidth
    });
  }

  // 2. Check each direct child of .poster for bottom-edge overflow
  const poster = document.querySelector('.poster');
  if (poster) {
    const posterRect = poster.getBoundingClientRect();
    const posterBottom = posterRect.top + posterRect.height;

    for (const child of poster.children) {
      const cr = child.getBoundingClientRect();
      const childBottom = cr.top + cr.height;
      const overflowPx = childBottom - posterBottom;

      if (overflowPx > 3 && cr.height > 10) {
        const tag = child.tagName.toLowerCase();
        const cls = child.className?.toString?.() || '';
        const label = cls.split(' ')[0] || tag;
        issues.push({
          type: 'ELEMENT_OVERFLOW',
          severity: 'CRITICAL',
          element: label,
          bottom: Math.round(childBottom),
          posterBottom: Math.round(posterBottom),
          overflowBy: Math.round(overflowPx),
          detail: `"${label}" 底部超出画布 ${Math.round(overflowPx)}px`
        });
      }
    }
  }

  // 3. Check every element for inline text clipping
  const allElements = document.querySelectorAll('.poster *');
  for (const el of allElements) {
    if (el.children.length === 0 && el.textContent.trim()) {
      if (el.scrollHeight > el.clientHeight + 2) {
        const txt = el.textContent.trim().substring(0, 40);
        issues.push({
          type: 'TEXT_CLIP',
          severity: 'WARNING',
          element: el.className?.toString?.()?.split(' ')[0] || el.tagName,
          text: txt,
          overflowBy: el.scrollHeight - el.clientHeight,
          detail: `"${txt}..." 文本被裁剪 ${el.scrollHeight - el.clientHeight}px`
        });
      }
    }
  }

  // 4. Check if all key sections are visible
  const checks = [
    { sel: '.r2-label', name: 'R2标签' },
    { sel: '.title-main', name: '标题' },
    { sel: '.cat-grid', name: '分类网格' },
    { sel: '.ref-table', name: '速查表' },
    { sel: '.footer', name: '页脚' },
  ];
  for (const c of checks) {
    const el = document.querySelector(c.sel);
    if (!el) {
      issues.push({ type: 'MISSING', severity: 'FATAL', detail: `${c.name} (${c.sel}) 不存在` });
    } else {
      const r = el.getBoundingClientRect();
      if (r.bottom > H + 5) {
        issues.push({
          type: 'CLIPPED',
          severity: 'CRITICAL',
          element: c.name,
          bottom: Math.round(r.bottom),
          overflowBy: Math.round(r.bottom - H),
          detail: `${c.name} 被截断，底部在 ${Math.round(r.bottom)}px (画布 ${H}px)`
        });
      }
    }
  }

  // 5. Measure spacing consistency
  const catBlocks = document.querySelectorAll('.cat-block, .cat-cell, .cat-row, .mech-row, .method-row');
  if (catBlocks.length >= 2) {
    const gaps = [];
    for (let i = 1; i < catBlocks.length; i++) {
      const prev = catBlocks[i-1].getBoundingClientRect();
      const curr = catBlocks[i].getBoundingClientRect();
      gaps.push(curr.top - prev.bottom);
    }
    const avgGap = gaps.reduce((a,b)=>a+b,0) / gaps.length;
    const maxDev = Math.max(...gaps.map(g => Math.abs(g - avgGap)));
    if (maxDev > 8) {
      issues.push({
        type: 'SPACING_INCONSISTENT',
        severity: 'INFO',
        detail: `分类间距不一致：平均${avgGap.toFixed(1)}px，最大偏差${maxDev.toFixed(1)}px`,
        gaps: gaps.map(g=>Math.round(g))
      });
    }
  }

  return {
    ok: issues.filter(i=>i.severity==='FATAL'||i.severity==='CRITICAL').length === 0,
    totalIssues: issues.length,
    fatalCount: issues.filter(i=>i.severity==='FATAL').length,
    criticalCount: issues.filter(i=>i.severity==='CRITICAL').length,
    warningCount: issues.filter(i=>i.severity==='WARNING').length,
    issues
  };
}, [W, H]);

console.log(JSON.stringify({ errors, result }, null, 2));

await browser.close();

// Exit code: 0 if no fatal/critical, 1 otherwise
const fatalOrCritical = result.issues.filter(i => i.severity === 'FATAL' || i.severity === 'CRITICAL').length;
process.exit(fatalOrCritical > 0 ? 1 : 0);
