function TreeNode(value) {
    if (!(this instanceof TreeNode)) {
        return new TreeNode(value);
    }
    this.value = value;
    this.leftNode;
    this.rightNode;
}

TreeNode.prototype = {
    addLeftNode: function(value) {
        this.leftNode = new TreeNode(value);
    },

    addRightNode: function(pNode, value) {
        this.rightNode = new TreeNode(value);
    }
}

var nodeArr = ["A", "B", "C", "D", "E", "F", "G", "H"];

!(function() {
    var nodeRoot = new TreeNode("A");
    nodeRoot.addLeftNode("B");
    nodeRoot.addRightNode("C");
    nodeRoot.leftNode.addLeftNode("D");
    nodeRoot.leftNode.addRightNode("E");
    nodeRoot.rightNode.addLeftNode("F");
    nodeRoot.rightNode.addRightNode("G");
    window.nodeRoot = nodeRoot;
})()


window.onload = function() {
    window.document.body.addEventListener("click", handelClick);
}

function handelClick(event) {
    event = event || window.event;
     if(event.target.type=="button"){
         var input = document.getElementById("arrInput");
         if(input.value){
             document.ta
         }
     }
}