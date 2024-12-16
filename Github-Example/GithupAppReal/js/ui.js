class UI {
    constructor() {
        this.profileContentDiv = document.querySelector("#profileContentDiv");
        this.githubName = document.querySelector("#githubName");
        this.tableContent = document.querySelector("#tableContent");
        this.isShowRepo = true;
        this.searchedUserList = document.querySelector("#searchedUserList");
        this.tableContent = document.querySelector("#tableContent");

    }

    fillSearchedUserToUIFromStorage() {
        const users = Storagex.getSearchedUserFromStorage();
        if (users != null && users.length > 0) {
            users.forEach(user => {
                const li = document.createElement("li");
                li.className = "list-group-item";
                li.textContent = user;
                this.searchedUserList.appendChild(li);
            })
        }
    }

    addSeachedUserToUI(username) {
        if (Storagex.checkUser(username)) {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = username;
            this.searchedUserList.appendChild(li);
        }
    }

    checkMessage() {
        const showRepoLink = document.querySelector("#showRepo");
        if (this.isShowRepo) {

            showRepoLink.textContent = "Repoları Göster";
        }
        else {
            showRepoLink.textContent = "Repoları Gizle";
        }
    }


    addUserProfileToUI(user) {

        this.profileContentDiv.innerHTML = `
            <div class="col-sm-12 col-md-5 col-lg-5">
                <div id="ProfilFotoDiv">
                    <img id="profilFoto" class="mb-3" src="${user.avatar_url}">
                    <hr id="hrId">
                    <span>${user.name}</span>
                    <span>Software Developer</span>
                    <br>
                </div>
            </div>

          
            <div class="col-sm-12 col-md-7 col-lg-7">

                <div class="notificationsDiv">
                    <button type="button" class="btn btn-success btn-sm">
                        Takipçi <span class="badge badge-light">${user.followers}</span>
                    </button>
                    <button type="button" class="btn btn-primary btn-sm">
                        Takip Edilen <span class="badge badge-light">${user.following}</span>
                    </button>
                    <button type="button" class="btn btn-warning btn-sm">
                        Repolar <span class="badge badge-light">${user.public_repos}</span>
                    </button>
                </div>

               
                <div id="infoDiv" class="mt-4 ml-1">
                    <div>
                        <img src="image/download.png" style="width: 20px; height:25px; margin-top: -10px;">
                        <span id="spanRIOT">${user.company == null ? "" : user.company} </span>
                    </div>

                    <div class="mt-3">
                        <img src="image/location.png" style="width: 20px; height:25px; margin-top: -10px;">
                        <span id="spanRIOT">${user.location == null ? "" : user.location} </span>
                    </div>

                    <div class="mt-3">
                        <img src="image/email icon.png" style="width: 20px; height:25px; margin-top: -10px;">
                        <span id="spanRIOT">${user.email == null ? "" : user.email} </span>
                    </div>

                    <div class="mt-3">
                        <a id="showRepo" href="#">Repoları Göster</a>
                    </div>
                </div>
            </div>
        </div>`;
    }
    showRepos(repos) {
        if (this.isShowRepo) {
            if (repos != null && repos.length > 0) {
                let sayac = 1;
                repos.forEach(repo => {
                    this.tableContent.innerHTML += `
                        <tr>
                            <th scope="row">${sayac}</th>
                            <td>${repo.name}</td>
                            <td>${repo.created_at}</td>
                        </tr>`
                    sayac += 1;
                })
            }
            this.isShowRepo = false;
            this.checkMessage();
        } else {
            this.isShowRepo = true;
            this.checkMessage();
            this.tableContent.textContent = "";
        }
    }

    clearSearchedUsers(){
        this.searchedUserList.innerHTML="";
    }

    clearInput() {
        this.githubName.value = "";
        this.profileContentDiv.innerHTML = "";
        this.tableContent.innerHTML = "";
    }


}