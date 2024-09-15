
    const canvas = document.getElementById('canvas');
    const face_color = document.getElementById("face-color");
    const border_color = document.getElementById("border-color");
    const hours_color = document.getElementById("hr-color");
    const mint_color = document.getElementById("mint-color");
    const secod_color = document.getElementById("sec-color");
    // const face_color = document.getElementById("face-color");
    

    let savedColors = JSON.parse(localStorage.getItem("setColor"));

   if(savedColors){
    face_color.value = savedColors.face_color;
    border_color.value = savedColors.border_color;
    hours_color.value = savedColors.hours_color;
    mint_color.value = savedColors.mint_color;
    secod_color.value = savedColors.secod_color;
   }
function clock(){    
    
    const ctx = canvas.getContext('2d');

    ctx.save()
    ctx.clearRect(0,0,500,500);
    ctx.translate(250,250);
    ctx.rotate(-Math.PI / 2);

    // setup default
    ctx.strokeStyle = border_color.value;
    ctx.fillStyle = face_color.value;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

   ctx.save();
    ctx.beginPath();
    ctx.lineWidth= 14;
    ctx.strokeStyle = border_color.value;
    ctx.arc(0, 0 , 140, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = hours_color.value;
    for(let i = 0; i < 12; i++){
        ctx.beginPath();
        ctx.moveTo(120,0);
        ctx.lineTo(100,0);
        ctx.stroke();
        ctx.rotate(Math.PI / 6);
    }
    ctx.restore();

    // mintus
    ctx.save();
    ctx.strokeStyle = secod_color.value;
    ctx.lineWidth = 4;
    for(let i = 0; i < 60; i++){
        if(i % 5 != 0){
        ctx.beginPath();
        ctx.moveTo(117,0);
        ctx.lineTo(120,0);
        ctx.stroke();
        }
        ctx.rotate(Math.PI / 30);
    }
    ctx.restore();
    ctx.save()
    // Get hours
    const now = new Date();
    const hr = now.getHours();
    const mint = now.getMinutes();
    const sec = now.getSeconds();
   
    ctx.restore();

    // draw hour hand
    ctx.save()
    ctx.rotate((Math.PI / 6)* hr + (Math.PI / 360) * mint + (Math.PI / 21600) * sec)
    ctx.strokeStyle = mint_color.value;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20,0);
    ctx.lineTo(80,0);
    ctx.stroke();
    ctx.restore();

 // draw mint hand
 ctx.save()
 ctx.rotate((Math.PI / 30) * mint + (Math.PI / 1800) * sec)
 ctx.strokeStyle = mint_color.value;
 ctx.lineWidth = 8;
 ctx.beginPath();
 ctx.moveTo(-28,0);
 ctx.lineTo(120,0);
 ctx.stroke();
 ctx.restore();

  // draw second hand
  ctx.save()
  ctx.rotate(sec * Math.PI / 30);
  ctx.strokeStyle = secod_color.value;
  ctx.fillStyle = secod_color.value;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-38,0);
  ctx.lineTo(100,0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0,0,10,0,Math.PI * 2,true);
  ctx.fill();
  ctx.restore();
   
  ctx.restore();
  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

let saveBtn = document.querySelector("#save-btn");

saveBtn.addEventListener("click", ()=>{
    let clockColor = {
        face_color:face_color.value,
        border_color:border_color.value,
        hours_color:hours_color.value,
        mint_color: mint_color.value,
        secod_color:secod_color.value,
     }     
  
    localStorage.setItem("setColor", JSON.stringify(clockColor));

})

document.getElementById("save-image-btn").addEventListener('click', (e)=>{
    alert("Do you Wanna Save this image?")
    let saveImg = canvas.toDataURL('image/png',1.0);    
    let link = document.createElement('a');
    link.download = "clock.png";
    link.href = saveImg;
    link.click();
})