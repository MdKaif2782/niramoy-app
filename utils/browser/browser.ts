import { Linking } from "react-native";

export function openInBrowser(url:string){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }

  export function ytLinkToThumbnail(url:string){
    const videoId = url.split("v=")[1];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }