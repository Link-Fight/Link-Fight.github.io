window.onload = function() {
    document.addEventListener("scroll", handleScroll)
    // vm.isSrollTo(0);
}

var vm = new verticalMenu();
function handleScroll(event) {
    console.log(document.body.scrollTop);
    vm.isSrollTo(document.body.scrollTop);
}


function verticalMenu(ele) {
    this.verticalMenu = document.getElementsByClassName("verticalMenu")[0].getElementsByTagName("a");

    this.verticalItme = document.getElementsByClassName("verticalItem");
}

verticalMenu.prototype.isSrollTo = function(scrollTop) {

    for (var i = 0; i < this.verticalItme.length; i++) {
        console.log(scrollTop+": "+i + ":" + this.verticalItme[i].offsetTop);
        if (scrollTop > this.verticalItme[i].offsetTop-130&&scrollTop < this.verticalItme[i].offsetTop) {
              
            for (var j = 0, leg = this.verticalMenu.length; j < leg; j++) {
                if (this.verticalMenu[j].href.split("#")[1] == this.verticalItme[i].id) {
                    if (this.verticalMenu[j].parentNode.className !="current") {
                        this.verticalMenu[j].parentNode.className = "current";
                    }
                }else{
                     this.verticalMenu[j].parentNode.className = "";
                }
            }

            break;
        }
    }

}