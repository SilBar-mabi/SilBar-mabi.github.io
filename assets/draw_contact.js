var canvas = $('#contactCanvas').get(0);

if (canvas.getContext) {
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgb(156, 167, 226)';

  ctx.fillRect(0, 0, 400, 600);

  ctx.beginPath();
  ctx.moveTo(20, 10);
  ctx.lineTo(80, 10);
  ctx.quadraticCurveTo(90, 10, 90, 20);
  ctx.lineTo(90, 80);
  ctx.quadraticCurveTo(90, 90, 80, 90);
  ctx.lineTo(20, 90);
  ctx.quadraticCurveTo(10, 90, 10, 80);
  ctx.lineTo(10, 20);
  ctx.quadraticCurveTo(10, 10, 20, 10);
  ctx.stroke();

}

var createFukidashi = function(param) {
  var ctx = param.ctx;

}
