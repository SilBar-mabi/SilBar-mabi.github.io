
function calcLanchaDamage() {
  // * 1は文字列を数字にする
  var maxDamage = $('#showBuffedMaxDamage').val() * 1;

  var lanchaMagni = $('#inputLanchaMagni').val() * 1;

  var chargeDamage = $('#inputChargeDamage').val() * 1;
  var mainDamage = $('#inputMainDamage').val() * 1;
  var bajoDamage = $('#inputBajoDamage').val() * 1;
  var bajoKyori = $('#inputBajoKyori').val() * 1;
  var lanchaEnhanced = $('#lanchaEnhancedSelect option:selected').val();
  
  var criMagni = $('#inputLanchaCriMagni').val() * 1;

  var supportMagni = $('#inputSupportMagni').val() * 1;
  var rageMagni = $('#inputRageMagni').val() * 1;
  var deathMagni = $('#inputDeathMagni').val() * 1;

  var bajoMagni = (lanchaMagni + 4 * chargeDamage) *
      (1 + (1400 + bajoKyori * 20) / 1000) * 1.2;
  var lanchaDamage = Math.floor(
    (maxDamage * bajoMagni / 100.0) * (1 + 0.025 * mainDamage) *
      (1 + 0.03 * bajoDamage)
  );
  if (lanchaEnhanced == "true") {
    Math.floor(lanchaDamage = lanchaDamage * 1.1);
  }

  $('#lanchaNonCri').text(lanchaDamage);
  $('#lanchaNonCriDeathMa').text(Math.floor(lanchaDamage * (1 + deathMagni / 100.0)));
  $('#lanchaNonCriSupport').text(Math.floor(lanchaDamage * (1 + supportMagni / 100.0)));
  $('#lanchaNonCriDeathMaSupport').text(Math.floor(
    lanchaDamage * (1 + deathMagni / 100.0) * (1 + supportMagni / 100.0)
  ));
  $('#lanchaNonCriDeathMaRageSupport').text(Math.floor(
    lanchaDamage * (1 + deathMagni / 100.0) *
      (1 + (supportMagni) / 100.0) *
      (1 + (rageMagni) / 100.0)
  ));

  // これひどいコードだね！
  lanchaDamage = Math.floor(lanchaDamage * (1 + criMagni / 100.0));
  $('#lanchaCri').text(lanchaDamage);
  $('#lanchaCriDeathMa').text(Math.floor(lanchaDamage * (1 + deathMagni / 100.0)));
  $('#lanchaCriSupport').text(Math.floor(lanchaDamage * (1 + supportMagni / 100.0)));
  $('#lanchaCriDeathMaSupport').text(Math.floor(
    lanchaDamage * (1 + deathMagni / 100.0) * (1 + supportMagni / 100.0)
  ));
  $('#lanchaCriDeathMaRageSupport').text(Math.floor(
    lanchaDamage * (1 + deathMagni / 100.0) *
      (1 + (supportMagni) / 100.0) *
      (1 + (rageMagni) / 100.0)
  ));
  
}

$('input.bmdtrigger').change(calcLanchaDamage);

$('select.bmdtrigger').change(calcLanchaDamage);



// 入力値の保存と復元
$('input.bmdtrigger').change(function() {
  localStorage.setItem(this.id, $(this).val());
});
$('select.bmdtrigger').change(function() {
  localStorage.setItem(this.id, $(this).val());
});
$(function() {
  $('input.bmdtrigger').each(function(i, elem) {
    $(elem).val(localStorage.getItem(elem.id));
  });
  $('select.bmdtrigger').each(function(i, elem) {
    $(elem).val(localStorage.getItem(elem.id));
  });

  calcMaxDamage();
});

