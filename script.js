            dataArray=JSON.parse(localStorage.getItem("myObject"));

            // const Tense = localStorage.getItem('tense-value');
            // const Name = localStorage.getItem('name-value');
            // const Score = localStorage.getItem('score-value');
            // const Max = localStorage.getItem('max-score');
            // const Cate=localStorage.getItem('cate-value');

            // document.getElementById("tense-value").textContent=Tense;
            // document.getElementById("name-value").textContent=Name;
            // document.getElementById("score-value").textContent=Score;
            // document.getElementById("max-value").textContent=Max;
            // document.getElementById("cate-value").textContent=Cate;

            
            

            function gotolink(link){
                location.href=link.value;
            }

            function gotolinkspecial(link){
                if(localStorage.length!=0){
                    localStorage.setItem('myObject', JSON.stringify(dataArray));
                }
                location.href=link.value;
            }

            function gotolinkfornow(link){
                localStorage.clear();
                location.href=link.value;
            }

            const currentList = document.getElementById("currentList");
            const potentialList = document.getElementById("potentialList");

            function displayList(){
                if(dataArray!=null && dataArray.length>0){
                    for(let i=0;i<dataArray.length;i++){
                        let tense=dataArray[i][0]
                        let name=dataArray[i][1]
                        let score=dataArray[i][2]
                        let max=dataArray[i][3]
                        if(dataArray[i][4]=="1"){
                            var cate="All Task"
                        }
                        else{
                            var cate="Practice Prep"
                        }


                        let li=document.createElement("li");
                        li.innerHTML="Assignment:"+name+"-----------Grade:"+score+"/"+max+"--------"+cate+""

                        if(tense==1){
                            currentList.appendChild(li);
                        }
                        else{
                            potentialList.appendChild(li);
                        }   
                        
                    }
                }
            }
            
            function calculateGrade(){
                if(dataArray!=null && dataArray.length>0){

                    let currentGrade = document.getElementById("CurrentGrade");
                    let currentPrecent = document.getElementById("CurrentPercent");
                    let potentialGrade = document.getElementById("PotentialGrade");
                    let potentialPrecent = document.getElementById("PotentialPrecent");

                    var cAllTaskTotal=0
                    var cAllTaskMax=0
                    var cPracticePrepTotal=0
                    var cPracticePrepMax=0

                    var pAllTaskTotal=0
                    var pAllTaskMax=0
                    var pPracticePrepTotal=0
                    var pPracticePrepMax=0

                    var cGrade=0
                    var pGrade=0


                    for(let i=0;i<dataArray.length;i++){
                        let tense=parseInt(dataArray[i][0])
                        let score=parseInt(dataArray[i][2])
                        let max=parseInt(dataArray[i][3])
                        if(dataArray[i][4]=="1"){
                            var cate="All Task"
                        }
                        else{
                            var cate="Practice Prep"
                        }


                        if(tense==1){
                            if(cate=="All Task"){
                                cAllTaskTotal+=score
                                cAllTaskMax+=max
                            }
                            else{
                                cPracticePrepTotal+=score
                                cPracticePrepMax+=max
                            }
                        }
                        
                        if(cate=="All Task"){
                            pAllTaskTotal+=score
                            pAllTaskMax+=max
                        }
                        else{                            
                            pPracticePrepTotal+=score
                            pPracticePrepMax+=max
                        }
                        

                }
                // console.log(cAllTaskMax,cAllTaskTotal,pAllTaskMax,pAllTaskTotal)
                // console.log(cPracticePrepMax,cPracticePrepTotal,pPracticePrepMax,pPracticePrepTotal)


                if(cAllTaskMax==0){
                    cGrade=getPercent(cPracticePrepTotal,cPracticePrepMax)*100
                    if(pAllTaskMax==0){
                        pGrade=getPercent(pPracticePrepTotal,pPracticePrepMax)*100
                    }
                    else{
                        pGrade=(getPercent(pAllTaskTotal,pAllTaskMax)*.9+getPercent(pPracticePrepTotal,pPracticePrepMax)*0.1 )*100
                    }
                }
                else if(cPracticePrepMax==0){
                    cGrade=getPercent(cAllTaskTotal,cAllTaskMax)*100
                    if(pPracticePrepMax==0){
                        pGrade=getPercent(pAllTaskTotal,pAllTaskMax)*100
                    }
                    else{
                        pGrade=(getPercent(pAllTaskTotal,pAllTaskMax)*.9+getPercent(pPracticePrepTotal,pPracticePrepMax)*0.1 )*100
                    }
                }
                else{
                    cGrade=(getPercent(cAllTaskTotal,cAllTaskMax)*.9+getPercent(cPracticePrepTotal,cPracticePrepMax)*0.1 )*100
                    pGrade=(getPercent(pAllTaskTotal,pAllTaskMax)*.9+getPercent(pPracticePrepTotal,pPracticePrepMax)*0.1 )*100
                }


                currentGrade.innerHTML="<p>grade: "+getGrade(cGrade)+"</p>";
                currentPrecent.innerHTML="<p>percent: "+cGrade.toFixed(0)+"</p>";
                potentialGrade.innerHTML="<p>grade: "+getGrade(pGrade)+"</p>";
                potentialPrecent.innerHTML="<p>percent: "+pGrade.toFixed(0)+"</p>";





                let li=document.createElement("li");
                        li.innerHTML="Assignment:"+name+"-----------Grade:"+score+"/"+max+"--------"+cate+""

                        if(tense==1){
                            currentList.appendChild(li);
                        }
                        else{
                            potentialList.appendChild(li);
                        }
                }
            }
        
        function getPercent(t,m){
            console.log(t,m)
            if(m==0){
                return 0
            }
            else{
                return t/m
            }
        }


        function getGrade(g){

            if(g>=89.5){
                return "A"
            }
            else if(g>=79.5){
                return "B"
            }
            else if(g>=69.5){
                return "C"
            }
            else if(g>=59.5){
                return "D"
            }
            else{
                return "E"
            }
        }
        

        
            window.onload = function(){
                displayList()
                calculateGrade()
            }
        