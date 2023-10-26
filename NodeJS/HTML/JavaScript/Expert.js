var currPageNum;
var posts; 
var prePage;
var nextPage;
var pageCount;
var pageNum;

function InitPage(){
    currPageNum = 1;

    posts = document.getElementsByClassName("commentRequest");
    prePage = document.getElementById("prePage");
    nextPage = document.getElementById("nextPage");
    pageNum = document.getElementById("pageNum");
    pageCount = Math.ceil(posts.length / 5);
    console.log(pageCount);
    PageLoad();
    
    prePage.style.visibility = "hidden";
}
function SetPost(){
    var posts = document.getElementsByClassName("commentRequest");
    for(let i = 0; i < posts.length; i++){
        posts[i].style.display = "none";
    }
}
function PageLoad(){
    SetPost();

    var startPageNum;

    if(currPageNum == 1){
        startPageNum = 0;
    }
    else{
        startPageNum = (currPageNum - 1) * 5 ;
    }
    for(let i = startPageNum; i < currPageNum * 5; i++){
        if(i >= posts.length){
            break;
        }
        posts[i].style.display = "";
    }
}
function SetPreNum(){
    currPageNum -= 1;
    PageLoad();
    SetCurrentPageText(currPageNum);

    if(currPageNum === 1){
        prePage.style.visibility = "hidden";
        nextPage.style.visibility = "visible";
    }
    else{
        prePage.style.visibility = "visible";
        nextPage.style.visibility = "visible";
    }
}
function SetNextNum(){
    currPageNum += 1;
    console.log(currPageNum >= pageCount);
    PageLoad();
    SetCurrentPageText(currPageNum);
    if(pageCount <= currPageNum){
        nextPage.style.visibility = "hidden";
        prePage.style.visibility = "visible";
    }
    else {
        prePage.style.visibility = "visible";
        nextPage.style.visibility = "visible";
    }
}
function SetCurrentPageText(currentPageNum){
    pageNum.textContent = currentPageNum;
}