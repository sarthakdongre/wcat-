#!/usr/bin/env node
let fs=require("fs");
//const { arch } = require("os");
let inputArr=process.argv.slice(2);
let optionArr= [];
let filesArr= []; 
for(let i=0;i<inputArr.length;i++){
    let firstChar=inputArr[i].charAt(0);
    if(firstChar=="-"){
        optionArr.push(inputArr[i]);

    }else{
        filesArr.push(inputArr[i]);
    }
}
let isBothpresent =optionArr.includes("-b")&& optionArr.includes("=n");
if(isBothpresent==true){
    console.log("either enter -n or -b option");
    return;
}
for(let i=0;i<filesArr.length;i++){
    let ans=fs.existsSync(filesArr[i]);
    if(ans==false){
       console.log(`file  ${filesArr[i]} is not present`);
       return;
    }
    
}



let content=""; 
for(let i=0;i<filesArr.length;i++){
    let bufferContent=content+fs.readFileSync(filesArr[i]);
    content+=bufferContent+"\r\n";
}
//console.log(content);

let contentArr=content.split("\r\n");
//console.log(contentArr);


let isPresent=optionArr.includes("-s");
if(isPresent==true){

    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]==""&& contentArr[i-1]==""){
            contentArr[i]=null;
        }
        else if(contentArr[i]==""&& contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    let tempArr=[];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
        tempArr.push(contentArr[i]);
        }
    }
    contentArr=tempArr;
}
console.log("-------------------");
//console.log(contentArr.join("\n"));
let isNpresent=optionArr.includes("-n");  
 if(isNpresent==true){
     for(let i=0;i<contentArr.length;i++){
         contentArr[i]=`${i+1} ${contentArr[i]}`;
     }
 }
 //console.log(contentArr.join("\n"));
 let isBpresent=optionArr.includes("-b");  
 if(isBpresent==true){
     let count=1;
     for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i]=`${count} ${contentArr[i]}`;
            count++;
        }
     }
 }
 console.log(contentArr.join("\n"));























