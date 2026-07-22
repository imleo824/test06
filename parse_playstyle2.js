const lines = `全场大小	567,094.87 	41.63%	8,416.05 	18,071.45 	15,920.67 	-2,141.05 	3.19%	2.81%	-0.38%
滚球	346,163.22 	25.40%	7,509.48 	11,915.09 	9,760.38 	-2,145.08 	3.44%	2.82%	-0.62%
早盘	220,931.65 	16.22%	906.57 	6,156.36 	6,160.29 	4.03 	2.79%	2.79%	0.00%
全场让球	622,312.45 	45.69%	6,890.38 	15,328.61 	15,166.35 	-158.53 	2.46%	2.44%	-0.03%
滚球	221,335.32 	16.25%	1,528.98 	6,297.09 	6,132.23 	-161.89 	2.85%	2.77%	-0.07%
早盘	400,977.13 	29.44%	5,361.40 	9,031.52 	9,034.12 	3.36 	2.25%	2.25%	0.00%
上半场大小	127,749.44 	9.38%	3,199.47 	4,430.06 	4,911.87 	483.04 	3.47%	3.84%	0.38%
滚球	91,567.15 	6.72%	2,631.18 	3,362.36 	3,807.20 	445.74 	3.67%	4.16%	0.49%
早盘	36,182.29 	2.66%	568.29 	1,067.70 	1,104.66 	37.30 	2.95%	3.05%	0.10%
上半场让球	45,088.41 	3.31%	1,485.91 	1,512.47 	1,415.21 	-94.87 	3.35%	3.14%	-0.22%
滚球	22,424.79 	1.64%	540.65 	866.72 	746.56 	-117.81 	3.86%	3.33%	-0.54%
早盘	22,663.62 	1.66%	945.26 	645.76 	668.65 	22.93 	2.85%	2.95%	0.10%`;

const rows = lines.trim().split('\n').map(line => {
  const p = line.split('\t').map(x => x.trim());
  return {
    name: p[0],
    volume: parseFloat(p[1].replace(/,/g, '')),
    volumeShare: parseFloat(p[2].replace('%', '')),
    winLoss: parseFloat(p[3].replace(/,/g, '')),
    expectedWater: parseFloat(p[4].replace(/,/g, '')),
    actualWater: parseFloat(p[5].replace(/,/g, '')),
    waterDiff: parseFloat(p[6].replace(/,/g, '')),
    expectedRate: parseFloat(p[7].replace('%', '')),
    actualRate: parseFloat(p[8].replace('%', '')),
    rateDiff: parseFloat(p[9].replace('%', '')),
    isSub: p[0] === '滚球' || p[0] === '早盘'
  };
});

let out = 'export const playstyleWaterDiffData = [\n';
for (const r of rows) {
  out += `  {\n`;
  out += `    name: "${r.name}",\n`;
  out += `    volume: ${r.volume},\n`;
  out += `    volumeShare: ${r.volumeShare},\n`;
  out += `    winLoss: ${r.winLoss},\n`;
  out += `    expectedWater: ${r.expectedWater},\n`;
  out += `    actualWater: ${r.actualWater},\n`;
  out += `    waterDiff: ${r.waterDiff},\n`;
  out += `    expectedRate: ${r.expectedRate},\n`;
  out += `    actualRate: ${r.actualRate},\n`;
  out += `    rateDiff: ${r.rateDiff},\n`;
  out += `    isSub: ${r.isSub}\n`;
  out += `  },\n`;
}
out += '];\n';
console.log(out);
