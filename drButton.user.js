// ==UserScript==
// @name        drButtonDEV
// @namespace   Empty Unicode Character to Clipboard
// @match       https://www.documentingreality.com/forum/newthread.php?do=newthread*
// @match       https://www.documentingreality.com/forum/newreply.php?do=postreply*
// @match       https://www.documentingreality.com/forum/f*/*/*
// @grant       none
// @version     1.0.2
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

const customStylesheet = `
div.buttonContainer
{
    position: fixed;
    top: 10px;
    left: 10px;
}

div.buttonContainer > button[class^="customButton"]
{
    margin-top: 6px;
    display: block;
    padding: 10px 10px;
    background-image: url("https://v1r.eu/emptyunicode.gif");
}
`;

const buttonData = [
    () =>
    {
        const textarea = document.querySelector('textarea[id^="vB_Editor"]');
        textarea.value = (textarea.value + '⠀');
    }
];

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('buttonContainer');

buttonData.forEach((data, index) =>
{
    const button = document.createElement('button');

    button.setAttribute('type', 'button');
    button.setAttribute('value', 'test');
    button.classList.add(`customButton-${index}`);

    button.addEventListener('click', (e) =>
    {
        e.preventDefault();

        data();
    });

    buttonContainer.appendChild(button);
});

document.getElementsByTagName('body')[0].appendChild(buttonContainer);

const style = document.createElement('style');

style.classList.add('injectedStyle');
style.textContent = customStylesheet;

document.head.append(style);
