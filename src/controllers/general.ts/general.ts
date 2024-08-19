export function adjustTextAreaHeight(textArea: HTMLTextAreaElement) {
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight +5+ 'px';
}