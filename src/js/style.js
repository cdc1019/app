var dl = document.querySelectorAll('footer>dl');
// console.log(dl);
dl.forEach(function() {
    this.onclick = function() {
        console.log(1);
    }
})