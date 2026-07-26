/**
 * Verify data integrity after migration — spot-check records against source data.
 * Usage:  bun run scripts/verify-migration.ts
 */

import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const sql = neon(url);

async function verify() {
  console.log("=== Spot-Check Verification ===\n");

  // ── Spot Check 1: maple-leaf-foods (employer) ──
  console.log("1. maple-leaf-foods — employer record");
  const e1 = await sql`
    SELECT slug, name, industry, province, city, employee_count, founded,
           locations, hiring_history, open_positions
    FROM employers WHERE slug = 'maple-leaf-foods'
  `;
  const emp1 = e1[0] as any;
  console.log(`   slug:           ${emp1.slug}`);
  console.log(`   name:           ${emp1.name}`);
  console.log(`   industry:       ${emp1.industry}`);
  console.log(`   province:       ${emp1.province}`);
  console.log(`   city:           ${emp1.city}`);
  console.log(`   employee_count: ${emp1.employee_count}`);
  console.log(`   founded:        ${emp1.founded}`);
  console.log(`   locations:      ${JSON.stringify(emp1.locations).length} chars — ${emp1.locations.length} entries`);
  console.log(`   hiring_history: ${JSON.stringify(emp1.hiring_history).length} chars — ${emp1.hiring_history.length} entries`);
  console.log(`   open_positions: ${JSON.stringify(emp1.open_positions).length} chars — ${emp1.open_positions.length} entries`);
  // Expected: locations=5, hiring_history=4, open_positions=3
  const locs1ok = emp1.locations.length === 5;
  const hh1ok = emp1.hiring_history.length === 4;
  const op1ok = emp1.open_positions.length === 3;
  console.log(`   → locations (5): ${locs1ok ? "✓" : "✗ got " + emp1.locations.length}`);
  console.log(`   → hiring_history (4): ${hh1ok ? "✓" : "✗ got " + emp1.hiring_history.length}`);
  console.log(`   → open_positions (3): ${op1ok ? "✓" : "✗ got " + emp1.open_positions.length}`);

  // ── Spot Check 2: maple-leaf-foods (LMIA) ──
  console.log("\n2. maple-leaf-foods — LMIA record");
  const l1 = await sql`
    SELECT employer_slug, total_approvals, approval_rate, wage_average,
           sponsorship_score, streams, top_occupations, yearly_history, hiring_provinces
    FROM employer_lmia WHERE employer_slug = 'maple-leaf-foods'
  `;
  const lmia1 = l1[0] as any;
  console.log(`   employer_slug:     ${lmia1.employer_slug}`);
  console.log(`   total_approvals:   ${lmia1.total_approvals} (expected: 342) ${lmia1.total_approvals === 342 ? "✓" : "✗"}`);
  console.log(`   approval_rate:     ${lmia1.approval_rate} (expected: 95.00) ${Number(lmia1.approval_rate) === 95.0 ? "✓" : "✗"}`);
  console.log(`   wage_average:      ${lmia1.wage_average} (expected: 21.40) ${Number(lmia1.wage_average) === 21.40 ? "✓" : "✗"}`);
  console.log(`   sponsorship_score: ${lmia1.sponsorship_score} (expected: 78) ${lmia1.sponsorship_score === 78 ? "✓" : "✗"}`);
  console.log(`   top_occupations:   ${lmia1.top_occupations.length} entries (expected: 5) ${lmia1.top_occupations.length === 5 ? "✓" : "✗"}`);
  console.log(`   yearly_history:    ${lmia1.yearly_history.length} entries (expected: 4) ${lmia1.yearly_history.length === 4 ? "✓" : "✗"}`);
  console.log(`   hiring_provinces:  ${lmia1.hiring_provinces.length} entries (expected: 4) ${lmia1.hiring_provinces.length === 4 ? "✓" : "✗"}`);
  console.log(`   streams keys:      ${Object.keys(lmia1.streams).length} (expected: 6) ${Object.keys(lmia1.streams).length === 6 ? "✓" : "✗"}`);

  // ── Spot Check 3: shopify-inc (LMIA) ──
  console.log("\n3. shopify-inc — LMIA record (tech company, different profile)");
  const l2 = await sql`
    SELECT employer_slug, total_approvals, approval_rate, wage_average::float,
           sponsorship_score, top_occupations, yearly_history, hiring_provinces
    FROM employer_lmia WHERE employer_slug = 'shopify-inc'
  `;
  const lmia2 = l2[0] as any;
  console.log(`   employer_slug:     ${lmia2.employer_slug}`);
  console.log(`   total_approvals:   ${lmia2.total_approvals} (expected: 85) ${lmia2.total_approvals === 85 ? "✓" : "✗"}`);
  console.log(`   approval_rate:     ${lmia2.approval_rate} (expected: 96.60) ${Number(lmia2.approval_rate) === 96.60 ? "✓" : "✗"}`);
  console.log(`   wage_average:      ${lmia2.wage_average} (expected: 62.00) ${Number(lmia2.wage_average) === 62.00 ? "✓" : "✗"}`);
  console.log(`   sponsorship_score: ${lmia2.sponsorship_score} (expected: 65) ${lmia2.sponsorship_score === 65 ? "✓" : "✗"}`);
  console.log(`   top_occupations:   ${lmia2.top_occupations.length} entries (expected: 5) ${lmia2.top_occupations.length === 5 ? "✓" : "✗"}`);

  // ── Spot Check 4: Job (senior-software-engineer-shopify) ──
  console.log("\n4. job: senior-software-engineer-shopify");
  const j1 = await sql`
    SELECT id, title, employer_slug, location, type, salary, remote,
           requirements, category
    FROM jobs WHERE id = 'senior-software-engineer-shopify'
  `;
  const job1 = j1[0] as any;
  console.log(`   id:             ${job1.id}`);
  console.log(`   title:          ${job1.title}`);
  console.log(`   employer_slug:  ${job1.employer_slug} (expected: shopify-inc) ${job1.employer_slug === "shopify-inc" ? "✓" : "✗"}`);
  console.log(`   location:       ${job1.location} (expected: Ottawa, ON) ${job1.location === "Ottawa, ON" ? "✓" : "✗"}`);
  console.log(`   type:           ${job1.type} (expected: Full-time) ${job1.type === "Full-time" ? "✓" : "✗"}`);
  console.log(`   salary:         ${job1.salary} (expected: $140,000 - $190,000)`);
  console.log(`   remote:         ${job1.remote} (expected: true) ${job1.remote === true ? "✓" : "✗"}`);
  console.log(`   requirements:   ${job1.requirements.length} entries (expected: 5) ${job1.requirements.length === 5 ? "✓" : "✗"}`);
  console.log(`   category:       ${job1.category} (expected: Technology) ${job1.category === "Technology" ? "✓" : "✗"}`);

  // ── Spot Check 5: Job (meat-processing-worker-mlf) ──
  console.log("\n5. job: meat-processing-worker-mlf");
  const j2 = await sql`
    SELECT id, title, employer_slug, location, type, salary, remote,
           requirements, category
    FROM jobs WHERE id = 'meat-processing-worker-mlf'
  `;
  const job2 = j2[0] as any;
  console.log(`   id:             ${job2.id}`);
  console.log(`   title:          ${job2.title}`);
  console.log(`   employer_slug:  ${job2.employer_slug} (expected: maple-leaf-foods) ${job2.employer_slug === "maple-leaf-foods" ? "✓" : "✗"}`);
  console.log(`   location:       ${job2.location} (expected: Brandon, MB) ${job2.location === "Brandon, MB" ? "✓" : "✗"}`);
  console.log(`   type:           ${job2.type} (expected: Full-time) ${job2.type === "Full-time" ? "✓" : "✗"}`);
  console.log(`   salary:         ${job2.salary}`);
  console.log(`   remote:         ${job2.remote} (expected: false) ${job2.remote === false ? "✓" : "✗"}`);
  console.log(`   requirements:   ${job2.requirements.length} entries (expected: 5) ${job2.requirements.length === 5 ? "✓" : "✗"}`);
  console.log(`   category:       ${job2.category} (expected: Food Processing) ${job2.category === "Food Processing" ? "✓" : "✗"}`);

  // ── Deep nested check: a yearlyHistory entry for maple-leaf-foods ──
  console.log("\n6. Deep nested: maple-leaf-foods yearlyHistory[0]");
  const yh0 = lmia1.yearly_history[0];
  console.log(`   ${JSON.stringify(yh0)}`);
  console.log(`   → year=2022, q1=18, q2=22, q3=24, q4=26, total=90, approvalRate=93.8`);
  const yhOk = yh0.year === 2022 && yh0.q1 === 18 && yh0.q2 === 22 && yh0.q3 === 24 && yh0.q4 === 26 && yh0.total === 90 && yh0.approvalRate === 93.8;
  console.log(`   → match: ${yhOk ? "✓" : "✗"}`);

  console.log("\n=== All Spot Checks Complete ===");
}

verify()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Verification failed:", err);
    process.exit(1);
  });
