function calcBuffedDamages() {
  var maxDamage = $('#inputMaxDamage').val();
  maxDamage = calcBuffedDamage(maxDamage);
  $('#showBuffedMaxDamage').val(maxDamage)

  var minDamage = $('#inputMinDamage').val();
  minDamage = calcBuffedDamage(minDamage);
  $('#showBuffedMinDamage').val(minDamage)

  // 本当はここでchangeイベントを発火したいけど、なぜか発火できない。
  // とても嫌だけど関数を直に呼ぶ。
  //$('#showBuffedMaxDamage').trigger('change');
  calcBladeDamages();
  calcLanchaDamage();
}
function calcBuffedDamage(damage) {
  // 計算ロジックが複雑なので、計算ロジックに制御文を入れずに書きたい
  // だから最初に各バフ数値を取得し、無効なら不変となるような値を設定しとく
  var jokyoku = 0;
  if ($('#enableJokyoku').prop("checked")) {
    jokyoku = $('#' + $('input[name=jokyokuRadios]:checked').val()).val();
  }
  
  var hone = 1.0;
  if ($('#enableHone').prop("checked") &&
      $('#honeSelect option:selected').val() == 'true') {
    hone = 1.2;
  }
  
  var otakebi = 0;
  if ($('#enableOtakebi').prop("checked")) {
    if ($('[name=otakebiRadios]:checked').val() === 'otakebiNum') {
      otakebi = $('#inputOtakebiNum').val();
    }
    else {
      otakebi = 31.2 + 0.2 * $('#inputOtakebiSaiku').val();
    }
  }

  // 計算式がこれであってるのかは知りませーん
  // 序曲
  damage = Math.floor(damage * (1 + jokyoku * hone / 100.0));
  // 雄叫び
  damage = Math.ceil(damage * (1 + otakebi * hone / 100.0));
  // 骨
  damage = Math.floor(damage * hone);

  return damage;
}

$('input.mdtrigger').change(calcBuffedDamages);
$('input.mdtrigger[type!=radio]').change(function() {
  localStorage.setItem(this.id, $(this).val());
});
$('input.mdtrigger[type=radio]').change(function() {
  localStorage.setItem(this.name, $(this).val());
});

$('select.mdtrigger').change(calcBuffedDamages);
$('select.mdtrigger').change(function() {
  localStorage.setItem(this.id, $(this).val());
});

$('#inputOtakebiSaiku').change(function() {
  var saikuLevel = $('#inputOtakebiSaiku').val();
  var otakebiRate = 31.2 + 0.2 * saikuLevel;
  $('#showOtakebiRate').val(otakebiRate + '%');

  localStorage.setItem('showOtakebiRate', otakebiRate + '%');
});

$('input.switcher[type=checkbox]').change(function() {
  if ($(this).prop('checked')) {
    $(this).closest('div.switchee').removeClass('lightdown');
    $(this).closest('div.switchee').addClass('lightup');
  }
  else {
    $(this).closest('div.switchee').removeClass('lightup');
    $(this).closest('div.switchee').addClass('lightdown');
  }
});


$(function() {
  $('input.mdtrigger[type!=radio]').each(function(i, elem) {
    $(elem).val(localStorage.getItem(elem.id));
  });
  $('input.mdtrigger[type=radio]').each(function(i, elem) {
    var checkedVal = localStorage.getItem(elem.name);
    $('input[name=' + elem.name + ']').val([checkedVal]);
  });
  $('select.mdtrigger').each(function(i, elem) {
    $(elem).val(localStorage.getItem(elem.id));
  });

});
