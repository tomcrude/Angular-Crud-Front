export function addTokens(data:any){
    localStorage.setItem("username",data.info.username)
    localStorage.setItem("id",data.info.id)
    localStorage.setItem("token",data.info.token)
}

export function deleteTokens(){
    localStorage.removeItem("username")
    localStorage.removeItem("id")
    localStorage.removeItem("token")
}

export async function createImg(image:any, name:string){
    let response = await fetch(image);
    let datas = await response.blob();
    let metadata = {
    type: 'image/jpeg'
     };
    let file = new File([datas], name+".jpg", metadata);

    return file;
}