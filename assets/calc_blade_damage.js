
function calcBladeDamages() {
  var maxDamage = $('#showBuffedMaxDamage').val();
  var criMagni = $('#inputCriMagni').val();

  var maxBladeDamage = calcBladeDamage(maxDamage);
  var criBladeDamage = Math.floor(maxBladeDamage * criMagni / 100);  // クリ時の加算分
  var maxCri = maxBladeDamage + criBladeDamage;
  
  $('#showBladeMaxDamage').val(maxBladeDamage);
  $('#showBladeMaxDamageCri').val(maxCri);

  var minDamage = $('#showBuffedMinDamage').val();
  var minBladeDamage = calcBladeDamage(minDamage);
  var minCri = minBladeDamage + criBladeDamage;
  
  $('#showBladeMinDamage').val(minBladeDamage);
  $('#showBladeMinDamageCri').val(minCri);

  var onePunchProb = calcOnePunchProb(maxCri, minCri, 0.8, 400000);
  $('#showBladeOnePunchProb').val(Math.round(onePunchProb * 100) + '%');
}

// max: 最大ダメージ
// min: 最小ダメージ
// bal: バランス(0〜0.8)
// target: 目標ダメージ（ワンパンしたい敵のHP）
// returns: 0〜1までの実数値
function calcOnePunchProb(max, min, bal, target) {
  // 計算式はこれだけ見ても意味不明だと思うのでmabinogi wiki参照
  const width = 2000; // 4d1000の正規分布の切り取り幅
  const sd = 578;   // 4d1000の正規分布の標準偏差

  // 自明なやつは計算すらしない
  if (min >= target) {
    return 1;
  }
  if (max < target) {
    return 0;
  }

  // 平均：width * bal、標準偏差578の正規分布において、
  // targetは次のzの位置にいる。(0 <= z <= width)
  var z = width * (target - min) / (max - min);
  // このzより右側の確率分布を積分すれば、target以上のダメージ確率がでる
  // 標準正規分布だと簡単にそれが計算できるので、標準化するとzは、
  var z_norm = (z - width * bal) / sd;

  return (1 - cdf(z_norm));
}

// 正規分布関数の累積分布関数
// の、近似関数
function cdf(x) {
  const p = 0.2316419;
  const b1 = 0.31938153;
  const b2 = -0.356563782;
  const b3 =  1.781477937;
  const b4 = -1.821255978;
  const b5 =  1.330274429;

  var t = 1 / (1 + p * Math.abs(x));
  var Z = Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
  var y = 1 - Z * ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
  
  return (x > 0) ? y : 1 - y;
}

function calcBladeDamage(damage) {
  var bladeMagni = $('#inputBladeMagni').val();
  var danzaiLevel = $('#inputDanzaiLevel').val();
  var hogoPrune = $('#inputHogoPrune').val();
  var spikeNum = $('#spikeSelect option:selected').val();
  var supportMagni = $('#inputSupportMagni').val();
  var rageMagni = $('#inputRageMagni').val();
  var bladeEnhanced = $('#bladeEnhancedSelect option:selected').val();
  var deathMagni = $('#inputDeathMagni').val();
  var specialArrow = $('#specialArrowSelect option:selected').val() * 1;

  var bladeDamage = damage * (bladeMagni / 100.0);
  bladeDamage = Math.floor(bladeDamage * (1 + Math.floor(danzaiLevel / 10) * 0.05));
  bladeDamage = Math.floor(bladeDamage * (1 - Math.floor(Math.log10(1 + (125 - hogoPrune) / 14) * 70.23) / 100.0));
  if (spikeNum == 2) {
    bladeDamage = Math.floor(bladeDamage * 0.96);
  }

  bladeDamage = Math.floor(bladeDamage * (1 + supportMagni / 100.0));
  bladeDamage = Math.floor(bladeDamage * (1 + rageMagni / 100.0));
  if (bladeEnhanced == "true") {
    bladeDamage = Math.floor(bladeDamage * 1.15)
  }
  bladeDamage = Math.floor(bladeDamage * (1 + deathMagni / 100.0));

  // エルフ様！！
  bladeDamage = Math.floor(bladeDamage * specialArrow);

  return bladeDamage;
}

$('#inputHogoPrune').change(function() {
  var hogoPrune = $('#inputHogoPrune').val();
  var hogoRate = Math.floor(Math.log10(1 + (125 - hogoPrune) / 14) * 70.23);
  $('#showHogoRate').val(hogoRate + '%軽減');

  localStorage.setItem('showHogoRate', hogoRate + '%軽減');
});
$('input.bmdtrigger').change(calcBladeDamages);

$('select.bmdtrigger').change(calcBladeDamages);
