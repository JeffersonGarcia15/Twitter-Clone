export function replaceURLWithHTMLLinks(text) {
    // if a link was found, add <a> and $1 represents exp which will represent the url
    const exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text?.replace(exp, "<a href='$1' target='_blank'>$1</a>");
}
