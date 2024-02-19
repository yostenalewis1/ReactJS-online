/**
 * 
 * @param {string} text -- the text to be sliced
 * @param {number} {maxLength=50} -- the max length of the text 
 * @returns                        -- the sliced text
 */
export function textslice(text:string , maxLength:number = 50){
    if(text.length >= maxLength){
        return `${text.slice(0,maxLength)} ...`;
    }
    return text;
}
 