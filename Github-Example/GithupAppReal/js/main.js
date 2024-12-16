const githubName = document.querySelector("#githubName");
const form = document.querySelector("#searchForm");
const clearButton=document.querySelector("#clearButton");
const clearAllButton=document.querySelector("#clearAllButton");
const github = new Github();
const ui = new UI();
runEventListeners();

function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click",clearInput);
    document.addEventListener("DOMContentLoaded",runPageLoaded);
    clearAllButton.addEventListener("click",clearSearchedUser);
}

function clearSearchedUser(){
    Storagex.clearAllSearchedUserFromStorage();
    ui.clearSearchedUsers();
}

function runPageLoaded(){
    ui.fillSearchedUserToUIFromStorage();
}

function clearInput(){
    ui.clearInput();
}

function search(e) {
    const username = githubName.value.trim(); // Sağ ve sol boşlukları silip değeri al.
    if (username == null || username == "") {
        alert("Lütfen geçerli bir kullanıcı adı giriniz.")
    }
    else {
        github.getGithubData(username)
            .then(response =>{
                ui.addSeachedUserToUI(username);
                Storagex.addSearchedUsersToStorage(username);
                ui.addUserProfileToUI(response.user);
                document.querySelector("#showRepo").addEventListener("click", ()=>ui.showRepos(response.repo));
            })
            .catch(error => console.log(error))
    }
    e.preventDefault(); // Farklı sayfaya yönlendirmemesi için kod.
}