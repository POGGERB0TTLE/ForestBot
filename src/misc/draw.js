const querys = require('../data/querys.json');
module.exports = (db, names) => {
  Canvas = require("canvas");
  let width = Math.ceil(names.length / 16) * 278;
  Canvas.registerFont("./assets/mc.otf", { family: "mc" });
  const canvas = Canvas.createCanvas(width + 2, 350);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.font = "16px mc";
  function loadPing(ping) {
    if (ping === null || ping === undefined || ping < 0)
      return "./assets/signal_0.png";
    if (ping < 150) return "./assets/signal_5.png";
    if (ping < 300) return "./assets/signal_4.png";
    if (ping < 600) return "./assets/signal_3.png";
    if (ping < 1000) return "./assets/signal_2.png";
    return "./assets/signal_1.png";
  }
  function drawBlock(x, z, name, ping) {
    ctx.fillStyle = "#D3D3D3";
    ctx.globalAlpha = 1;
    ctx.fillRect(x + 2, z, 276, 20);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "black";

    Canvas.loadImage(`https://mc-heads.net/avatar/${name}/16`).then((img) => {
      ctx.drawImage(img, x + 5, z + 2, 16, 16);
    });
    Canvas.loadImage(loadPing(ping)).then((img) => {
      ctx.drawImage(img, x + 259, z + 2, 16, 16);
    });
    ctx.fillText(name, x + 23, z + 16);
  }
  function renderTab(a) {
    z = 0;
    x = 0;
    a.forEach((i) => {
      if (z > 330) {
        x = x + 278;
        z = 0;
      }
      splt = i.split(":");
      drawBlock(x, z, splt[0], splt[1]);
      z = z + 22;
    });
  }
  renderTab(names);
  setTimeout(function () {
    const imageAsBase64 = canvas.toDataURL("image/png");
    db.query(querys.updateTabListBase64String, [imageAsBase64]);
  }, 3000);
};