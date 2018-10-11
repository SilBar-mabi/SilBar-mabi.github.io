
function calcBladeDamagesHasi() {
  var maxDamage = $('#showBuffedMaxDamage').val();
  var criMagni = $('#inputCriMagni-hasi').val();

  var maxBladeDamage = calcBladeDamageHasi(maxDamage);
  var criBladeDamage = Math.floor(maxBladeDamage * criMagni / 100);  // クリ時の加算分
  var maxCri = maxBladeDamage + criBladeDamage;

  $('#showBladeMaxDamage-hasi').val(maxBladeDamage);
  $('#showBladeMaxDamageCri-hasi').val(maxCri);

  var minDamage = $('#showBuffedMinDamage').val();
  var minBladeDamage = calcBladeDamageHasi(minDamage);
  var minCri = minBladeDamage + criBladeDamage;
  
  $('#showBladeMinDamage-hasi').val(minBladeDamage);
  $('#showBladeMinDamageCri-hasi').val(minCri);

  var onePunchProb = calcOnePunchProb(maxCri, minCri, 0.8, 550000);
  $('#showBladeOnePunchProb-hasi').val(Math.round(onePunchProb * 100) + '%');
}

function calcBladeDamageHasi(damage) {
  var bladeMagni = $('#inputBladeMagni-hasi').val();
  var danzaiLevel = $('#inputDanzaiLevel-hasi').val();
  var hogoPrune = $('#inputHogoPrune-hasi').val();
  var supportMagni = $('#inputSupportMagni').val();
  var rageMagni = $('#inputRageMagni').val();
  var bladeEnhanced = $('#bladeEnhancedSelect-hasi option:selected').val();
  var deathMagni = $('#inputDeathMagni').val();
  var specialArrow = $('#specialArrowSelect-hasi option:selected').val() * 1;

  var bladeDamage = damage * (bladeMagni / 100.0);
  bladeDamage = Math.floor(bladeDamage * (1 + Math.floor(danzaiLevel / 10) * 0.05));
  bladeDamage = Math.floor(bladeDamage * (1 - Math.floor(Math.log10(1 + (180 - hogoPrune) / 14) * 70.23) / 100.0));

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

$('#inputHogoPrune-hasi').change(function() {
  var hogoPrune = $('#inputHogoPrune-hasi').val();
  var hogoRate = Math.floor(Math.log10(1 + (180 - hogoPrune) / 14) * 70.23);
  $('#showHogoRate-hasi').val(hogoRate + '%軽減');

  localStorage.setItem('showHogoRate-hasi', hogoRate + '%軽減');
});
$('input.bmdhtrigger').change(calcBladeDamagesHasi);
$('input.bmdtrigger').change(calcBladeDamagesHasi);

$('select.bmdhtrigger').change(calcBladeDamagesHasi);
$('select.bmdtrigger').change(calcBladeDamagesHasi);

