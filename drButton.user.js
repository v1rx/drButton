// ==UserScript==
// @name        Empty Unicode Character
// @namespace   Empty Unicode Character to Clipboard
// @match       https://www.documentingreality.com/forum/newthread.php?do=newthread*
// @match       https://www.documentingreality.com/forum/newreply.php?do=postreply*
// @match       https://www.documentingreality.com/forum/f*/*/*
// @grant       none
// @version     1.0
// @author      v1r
// @description 9/18/2022, 8:32:59 PM
// ==/UserScript==

const clipboardCopy = (text) =>
 {
     if(!navigator.clipboard)
     {
         const textArea = document.createElement('textarea');
         textArea.value = text;

         textArea.style.top = '0';
         textArea.style.left = '0';
         textArea.style.position = 'fixed';

         document.body.appendChild(textArea);
         textArea.focus();
         textArea.select();

         try
         {
             const successful = document.execCommand('copy');

             console.log('clipboardCopy', {
                 type: 'Fallback',
                 successful: successful
             });
         } catch (err) {
             console.log('clipboardCopy', {
                 type: 'Fallback',
                 successful: false
             });
         }

         document.body.removeChild(textArea);

         return;
     }

     navigator.clipboard.writeText(text).then(() =>
     {
         console.log('clipboardCopy', {
             type: 'async',
             successful: true
         });
     }).catch(() =>
     {
         console.log('clipboardCopy', {
             type: 'async',
             successful: false
         });
     });
 };

const button = document.createElement('button');

button.setAttribute('value', 'test');
button.setAttribute('type', 'button');
button.classList.add('customButton');

button.addEventListener('click', (e) =>
{
    e.preventDefault();

    clipboardCopy('⠀');
});

document.getElementsByTagName('body')[0].appendChild(button);

const customStylesheet = `
button.customButton
{
    position: fixed;
    top: 10px;
    padding: 10px 10px;
    background-image: url("https://v1r.eu/emptyunicode.gif");
}
`;

const style = document.createElement('style');

style.classList.add('injectedStyle');
style.textContent = customStylesheet;

document.head.append(style);
