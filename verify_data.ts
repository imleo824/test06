
import { RAW_MATCHES, waterDiffMatchData, playstyleProfitData, playstyleWaterDiffData } from './src/components/sections/WorldCupGuaranteeReview/data';

console.log('--- RAW_MATCHES Analysis ---');
console.log('Total matches:', RAW_MATCHES.length);
const totalVolume = RAW_MATCHES.reduce((sum, r) => sum + r[2], 0);
const totalWinLoss = RAW_MATCHES.reduce((sum, r) => sum + r[3], 0);
console.log('Total Volume:', totalVolume);
console.log('Total WinLoss:', totalWinLoss);
console.log('Average Hold Rate:', (totalWinLoss / totalVolume) * 100);

console.log('\n--- waterDiffMatchData Analysis ---');
console.log('Total entries:', waterDiffMatchData.length);
const expectedWater = waterDiffMatchData.reduce((sum, r) => sum + r.expectedWater, 0);
const actualWater = waterDiffMatchData.reduce((sum, r) => sum + r.actualWater, 0);
const waterDiff = waterDiffMatchData.reduce((sum, r) => sum + r.waterDiff, 0);
console.log('Total Expected Water:', expectedWater);
console.log('Total Actual Water:', actualWater);
console.log('Total Water Diff:', waterDiff);

console.log('\n--- Playstyle Comparison ---');
const profitHandicap = playstyleProfitData.find(p => p.name === '全场让球');
const waterHandicap = playstyleWaterDiffData.find(p => p.name === '全场让球');
console.log('Handicap Volume (Profit vs Water):', profitHandicap?.volume, 'vs', waterHandicap?.volume);
console.log('Handicap WinLoss (Profit vs Water):', profitHandicap?.winLoss, 'vs', waterHandicap?.winLoss);

const profitOU = playstyleProfitData.find(p => p.name === '全场大小');
const waterOU = playstyleWaterDiffData.find(p => p.name === '全场大小');
console.log('O/U Volume (Profit vs Water):', profitOU?.volume, 'vs', waterOU?.volume);
console.log('O/U WinLoss (Profit vs Water):', profitOU?.winLoss, 'vs', waterOU?.winLoss);
