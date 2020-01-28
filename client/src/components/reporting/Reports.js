import React from "react";


class NestedList extends React.Component {

    patternPrint = (n)=>{
        var i = 0;
        var j = 0;
        var k = 0;
        var l = 0;
        for(i=n; i>=0; i--){
            document.write(" <br/>");
        
        for(j = i; j>=0; j--){
            if(j%2==0){
                document.write(0);
            }
            else {
                document.write(1); 
            }
           
        }
    }
    document.write(" <br/>");
        for(k=0; k<=n; k++){
            document.write(" <br/>");
        
        for(l = 0; l<=i; l++){
            if(j%2==0){
                document.write(0);
            }
            else {
                document.write(1); 
            }
           
        }
   
    }
    }
  
    render() {
     
        return (
            <div id="demo">
                <button onClick={()=>this.patternPrint(5)}>pattern</button>
              
            </div>
        );
    }
}

export default NestedList;
