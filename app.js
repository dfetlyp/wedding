'use strict';
// Replace this single date when the couple confirms it. Includes Moscow's UTC offset.
const eventTime = new Date('2027-06-13T15:30:00+03:00').getTime();
function countdown(now=Date.now()) {
  const seconds = Math.max(0, Math.floor((eventTime-now)/1000));
  return {days:Math.floor(seconds/86400),hours:Math.floor(seconds/3600)%24,minutes:Math.floor(seconds/60)%60,seconds:seconds%60};
}
function tick(){const values=countdown();for(const [unit,value] of Object.entries(values)){const el=document.querySelector('[data-time="'+unit+'"]');if(el)el.textContent=String(value).padStart(2,'0');}}
tick();setInterval(tick,1000);
const form=document.getElementById('guest-form');
if(form){
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const status=document.getElementById('form-status');
    status.textContent='Спасибо! Так будет выглядеть подтверждение. Сейчас это макет: ответы никуда не отправлены.';
  });
  form.querySelectorAll('[name="attendance"]').forEach(radio=>radio.addEventListener('change',()=>{
    const unavailable=form.querySelector('[name="attendance"]:checked').value==='no';
    form.querySelector('.drinks').disabled=unavailable;
    form.querySelector('.drinks').style.opacity=unavailable?'.4':'1';
  }));
}
const dialog=document.getElementById('details-dialog');
const content={
  flowers:['Цветочная подписка','Здесь будет ссылка на вашу цветочную подписку. Подключим её, когда вы выберете сервис. В макете нет оплаты или сбора денег.'],
  chat:['Чат нашей свадьбы','Здесь будет приглашение в ваш Telegram-чат. Сейчас это макет: настоящая ссылка появится после создания чата.']
};
document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{
  const data=content[button.dataset.dialog];
  document.getElementById('dialog-title').textContent=data[0];
  document.getElementById('dialog-text').textContent=data[1];
  dialog.showModal();
}));
if(dialog){
  dialog.querySelectorAll('.close,.close-bottom').forEach(button=>button.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
}
