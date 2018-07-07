
function calcMaxDamage() {
  var maxDamage = $('#inputMaxDamage').val();

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
  maxDamage = Math.floor(maxDamage * (1 + jokyoku * hone / 100.0));
  // 雄叫び
  maxDamage = Math.floor(maxDamage * (1 + otakebi * hone / 100.0));
  // 骨
  maxDamage = Math.floor(maxDamage * hone);
  
  $('#showBuffedMaxDamage').val(maxDamage)
  
  // 本当はここでchangeイベントを発火したいけど、なぜか発火できない。
  // とても嫌だけど関数を直に呼ぶ。
  //$('#showBuffedMaxDamage').trigger('change');
  calcBladeDamage();
  calcLanchaDamage();
}

$('input.mdtrigger').change(calcMaxDamage);
$('input.mdtrigger[type!=radio]').change(function() {
  localStorage.setItem(this.id, $(this).val());
});
$('input.mdtrigger[type=radio]').change(function() {
  localStorage.setItem(this.name, $(this).val());
});

$('select.mdtrigger').change(calcMaxDamage);
$('select.mdtrigger').change(function() {
  localStorage.setItem(this.id, $(this).val());
});

$('#inputOtakebiSaiku').change(function() {
  var saikuLevel = $('#inputOtakebiSaiku').val();
  var otakebiRate = 31.2 + 0.2 * saikuLevel;
  $('#showOtakebiRate').val(otakebiRate + '%');

  localStorage.setItem('showOtakebiRate', otakebiRate + '%');
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
