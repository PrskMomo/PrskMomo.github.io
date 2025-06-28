window.onload = function() {

    let WAKU = [["first", 0, 0], ["second", 0, 0], ["third", 0, 0], ["fourth", 0, 0], ["fifth", 0, 0]];
    
    let TEST = [["10000", "20000"]]
    let memberElement = document.getElementsByClassName("member");
    let masterElement = document.getElementsByClassName("master");
    let canvasElement = document.getElementsByClassName("canvas");
    let skillElement = document.getElementsByClassName("skill");
    let performElement = document.getElementsByClassName("perform_num");

    WAKU.forEach(function(element){
        document.getElementById(`member_${element[0]}`).addEventListener("click", function (){ setImage(element); });
        document.getElementById(`master_${element[0]}`).addEventListener("click", function (e){ setMaster(e, element); });
        document.getElementById(`skill_${element[0]}`).addEventListener("click", function (e){ setSkill(e, element);});
        document.getElementById(`canvas_${element[0]}`).addEventListener("click", function (e){ setCanvas(e, element); }); 
    
  
    });

    
    
    setCard(130);

    function calcPerformAll(){
        let total = 0;
        let performance = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]; //[perform, master, canvas]
        
        for(let i = 0; i <= 4; i++){
            performance[i][1] = Number.parseInt(masterElement[i].textContent*600);
            performance[i][2] = Number.parseInt(canvasElement[i].textContent);
            performElement[i+1].textContent = performance[i][1] + performance[i][2];

            total += performance[i].reduce((s, v) => s + v, 0);
        }
        
        document.getElementById(`perform_num_all`).textContent = total;
    }

    function focus(element){
        let FOCUS = [""];

        FOCUS[0] = element[0];

        for(let i = 0; i <= 4; i++){
            document.getElementById(`member_${WAKU[i][0]}`).style.setProperty("--focus", "0");

            if(FOCUS[0] == WAKU[i][0]){
                document.getElementById(`member_${FOCUS[0]}`).style.setProperty("--focus", "2px solid black");
            }
        }

    }

    function setImage(element){
        
        focus(element);
        /*if(!element[1]){
            element[1] = 1;
            document.getElementById(`member_${element[0]}`).style.backgroundImage = "url('https://static.wikitide.net/projectsekaiwiki/8/86/Airi_4_thumbnail.png')"
            document.getElementById(`perform_num_${element[0]}`).textContent = TEST[0][0]
        } else {
            element[1] = 0;
            document.getElementById(`member_${element[0]}`).style.backgroundImage = "url('https://static.wikitide.net/projectsekaiwiki/0/09/Airi_4_trained_thumbnail.png')"
            document.getElementById(`perform_num_${element[0]}`).textContent = TEST[0][1]
        }*/
        
        
    }

    function setSkill(event, element){
        let lv = document.getElementById(`skill_${element[0]}`).textContent;
        focus(element);
        
        switch(lv){
            case "SLv.1":
                document.getElementById(`skill_${element[0]}`).textContent = "SLv.2";
                break;
            
            case "SLv.2":
                document.getElementById(`skill_${element[0]}`).textContent = "SLv.3";
                break;

            case "SLv.3":
                document.getElementById(`skill_${element[0]}`).textContent = "SLv.4";
                break;

            case "SLv.4":
                document.getElementById(`skill_${element[0]}`).textContent = "SLv.1";
                break;
        }

        event.stopPropagation();
    }

    function setMaster(event, element){
        let master = document.getElementById(`master_${element[0]}`).textContent;
        focus(element);
        
        switch(master){
            case "0":
                document.getElementById(`master_${element[0]}`).textContent = "1";
                document.getElementById(`master_${element[0]}`).style.opacity = 100;
                break;
            
            case "1":
                document.getElementById(`master_${element[0]}`).textContent = "2";
                document.getElementById(`master_${element[0]}`).style.backgroundPosition = "25.1%"
                break;
            
            case "2":
                document.getElementById(`master_${element[0]}`).textContent = "3";
                document.getElementById(`master_${element[0]}`).style.backgroundPosition = "50.2%";
                break;
            
            case "3":
                document.getElementById(`master_${element[0]}`).textContent = "4";
                document.getElementById(`master_${element[0]}`).style.backgroundPosition = "75.3%";
                break;
            
            case "4":
                document.getElementById(`master_${element[0]}`).textContent = "5";
                document.getElementById(`master_${element[0]}`).style.backgroundPosition = "100.4%";
                break;
            
            case "5":
                document.getElementById(`master_${element[0]}`).textContent = "0";
                document.getElementById(`master_${element[0]}`).style.opacity = 0;
                document.getElementById(`master_${element[0]}`).style.backgroundPosition = "0%";
                break;
        }

        calcPerformAll();
        event.stopPropagation();
    }

    function setCanvas(event, ele){
        focus(ele);
        if(!ele[2]){
            ele[2] = 1;
            document.getElementById(`canvas_${ele[0]}`).style.backgroundImage = "url('../worldlink/images/canvas_yes.png')"
            document.getElementById(`canvas_${ele[0]}`).textContent = 1500
        } else {
            ele[2] = 0;
            document.getElementById(`canvas_${ele[0]}`).style.backgroundImage = "url('../worldlink/images/canvas_no.png')"
            document.getElementById(`canvas_${ele[0]}`).textContent = 0
        }
        
        calcPerformAll();
        event.stopPropagation();
    }

    function setCard(value){
        let cards = document.getElementById('cards');
        for(let i = 1; i <= value; i++){
            let new_card = document.createElement('div');
            new_card.className = "card";

            cards.appendChild(new_card);
        }
    }

    fetch("./member_db.json")
        .then((data) => data.text())
        .then((res) => console.log(res));
}