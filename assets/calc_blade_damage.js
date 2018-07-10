
function calcBladeDamage() {
  var maxDamage = $('#showBuffedMaxDamage').val();

  var bladeMagni = $('#inputBladeMagni').val();
  var danzaiLevel = $('#inputDanzaiLevel').val();
  var criMagni = $('#inputCriMagni').val();
  var hogoPrune = $('#inputHogoPrune').val();
  var spikeNum = $('#spikeSelect option:selected').val();
  var supportMagni = $('#inputSupportMagni').val();
  var rageMagni = $('#inputRageMagni').val();
  var bladeEnhanced = $('#bladeEnhancedSelect option:selected').val();
  var deathMagni = $('#inputDeathMagni').val();
  var specialArrow = $('#specialArrowSelect option:selected').val() * 1;

  var bladeDamage = maxDamage * (bladeMagni / 100.0);
  bladeDamage = Math.floor(bladeDamage * (1 + (danzaiLevel / 10) * 0.05));
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

  $('#showBladeDamage').val(bladeDamage);

  bladeDamage = Math.floor(bladeDamage * (1 + criMagni / 100.0));
  $('#showBladeDamageCri').val(bladeDamage);
}

$('#inputHogoPrune').change(function() {
  var hogoPrune = $('#inputHogoPrune').val();
  var hogoRate = Math.floor(Math.log10(1 + (125 - hogoPrune) / 14) * 70.23);
  $('#showHogoRate').val(hogoRate + '%軽減');

  localStorage.setItem('showHogoRate', hogoRate + '%軽減');
});
$('input.bmdtrigger').change(calcBladeDamage);

$('select.bmdtrigger').change(calcBladeDamage);
