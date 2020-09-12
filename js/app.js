//make a POST request that creates a "post"
function sendTweet() {
    let tweetTitle = document.getElementById("title-input").value;
    let tweetBody = document.getElementById("body-input").value;
    
    let tweetData = {
        title: tweetTitle,
        body: tweetBody,
        userId: 1
    };

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 201) {
            alert("CONGRATULATIONS: your message has been successfully submitted!");
        } else if(this.readyState !=4) {
            alert("LOADING!");
        } else {
            alert("Something went wrong!");
        }
    }

    ajax.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(tweetData));

}

let tweetButton = document.getElementById("tweet-submit");
tweetButton.addEventListener("click", sendTweet);


//Make a PATCH request that updates a "post"
function updateTweet() {
    let tweetTitle = document.getElementById("title-input").value;
    let tweetBody = document.getElementById("body-input").value;
    
    let tweetData = {
        title: tweetTitle,
        body: tweetBody,
        userId: 1
        
    };

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
        } else if(this.readyState !=4) {
            console.log("LOADING!");
        } else {
           console.log("Something went wrong!");
           console.log(this.status);
        }
    }

    ajax.open("PATCH", "https://jsonplaceholder.typicode.com/posts/1", true);
    ajax.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    ajax.send(JSON.stringify(tweetData));

}
    updateTweet();


//Make a DELETE request that deletes a "post"
function deleteTweet() {
    let tweetTitle = document.getElementById("title-input").value;
    let tweetBody = document.getElementById("body-input").value;
        
    let tweetData = {
        title: tweetTitle,
        body: tweetBody,
        userId: 1
            
    };
    
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
        } else if(this.readyState !=4) {
            console.log("LOADING!");
        } else {
            console.log("Something went wrong!");
            console.log(this.status);
        }
    }
    
    ajax.open("DELETE", "https://jsonplaceholder.typicode.com/posts/1", true);
    ajax.send(JSON.stringify(tweetData));
    
}
    deleteTweet();


//Make a GET request that get all "posts"
function getTweet() {
  
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let tweetPosts = JSON.parse(this.responseText);
            let postArea = document.getElementById("post");
            for(let i=0; i<tweetPosts.length; i++) {
                let tweetArea = document.createElement("article");
                postArea.append(tweetArea);
                let postUserId = document.createElement("h2");
                let postTitle = document.createElement("h1");
                let postBody = document.createElement("p");
                tweetArea.append(postUserId);
                tweetArea.append(postTitle);
                tweetArea.append(postBody);
                postUserId.innerHTML = tweetPosts[i].userId;
                postTitle.innerHTML = tweetPosts[i].title;
                postBody.innerHTML = tweetPosts[i].body;
                let commentArea = document.createElement("div");
                tweetArea.append(commentArea);
                commentArea.setAttribute("class", "comment");
                commentArea.innerHTML = "<h2>COMMENTS</h2>";

                getComment(i);
            }
        } else if(this.readyState !=4) {
            console.log("LOADING!");
        } else {
           console.log("Something went wrong!");
            console.log(this.status);
        }
    }
        
    ajax.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    ajax.send();
        
}

getTweet();

//the function to display the comments of each post

function getComment(i) {

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let commentPosts = JSON.parse(this.responseText);
            for(let k=0; k<commentPosts.length; k++) {
                let commentName = document.createElement("h1");
                let commentEmail = document.createElement("h2");
                let commentBody = document.createElement("p");
                let commentArea = document.getElementsByClassName("comment");
                commentArea[i].append(commentName);
                commentArea[i].append(commentEmail);
                commentArea[i].append(commentBody);
                commentName.innerHTML = commentPosts[k].name;
                commentEmail.innerHTML = commentPosts[k].email;
                commentBody.innerHTML = commentPosts[k].body;
            }
        } else if(this.readyState !=4) {
            console.log("LOADING!");
        } else {
           console.log("Something went wrong!");
            console.log(this.status);
        }
    }
    
    let number = i + 1;
    ajax.open("GET", "https://jsonplaceholder.typicode.com/posts/" + number + "/comments", true);
    ajax.send();     
}

