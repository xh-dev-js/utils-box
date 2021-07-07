export module YoutubeDownloaderUtils{
    export const getVideoId = (url:string) =>{
        //https://www.youtube.com/watch?v=u4euYsaXS2k
        const rs = /^.*\/watch\?v=([\d|\w]+)$/.exec(url)
        if(rs !== null){
            return rs[1]
        }
        else{
            return null
        }

    }
}