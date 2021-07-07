import {DragEvent as ReactDragEvent} from "react";

export module DragDropUtils {
    export const extractFileFromDragEvent = (ev: DragEvent | ReactDragEvent): File | null =>{
        if (ev !== null && ev.dataTransfer !== null) {
            if (ev.dataTransfer.items) {
                for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                    // If dropped items aren't files, reject them
                    if (ev.dataTransfer.items[i].kind === 'file') {
                        const file = ev.dataTransfer.items[i].getAsFile();
                        if(file)
                            return file
                        else
                            return null
                    }
                }
                return null;
            } else {
                const file = ev.dataTransfer.files.length > 0 ? ev.dataTransfer.files[0] : null;
                if(file){
                    return file
                }
                return null
            }
        }
         return null
    }
}