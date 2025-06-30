/*const CARDS = {
    "sample": {
        "Name": "Ichika",
        "Group": "Leo",
        "Type": "Cool",
        "Rarity": 1,
        "Performance": 8475,
        "ImageLink": "../images/cards/leo/ichika/1.png"
    }
}*/

const CARDS = [{"1": {"Name": "Ichika", "Group": "Leo", "Type": "Cool", "Rarity": 1, "Performance": 8475, "ImageLink": "../images/cards/leo/ichika/1.png"}},{"2": {"Name": "Ichika", "Group": "Leo", "Type": "Happy", "Rarity": 2, "Performance": 18325, "ImageLink": "../images/cards/leo/ichika/2.png"}}]

window.onload = function() {

    const ham = document.querySelector('#drawer_input'); //js-hamburgerの要素を取得し、変数hamに格納
    const nav = document.querySelector('#cards'); //js-navの要素を取得し、変数navに格納

    ham.addEventListener('click', function () { //ハンバーガーメニューをクリックしたら
        ham.classList.toggle('active');
        nav.classList.toggle('active');

    });

    let MEMBER = ["first", "second", "third", "fourth", "fifth"];
    let WAKU = [["first", 0], ["second", 0], ["third", 0], ["fourth", 0], ["fifth", 0]];
    let performance = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]; //[perform, master, canvas]
    
    let FOCUS = [""];
    let FRAMES = ["", "", "", "", ""];
        
    
    WAKU.forEach(function(element){
        document.getElementById(`member_${element[0]}`).addEventListener("click", function (){ focus(element); });
        document.getElementById(`master_${element[0]}`).addEventListener("click", function (e){ setMaster(e, element); });
        document.getElementById(`skill_${element[0]}`).addEventListener("click", function (e){ setSkill(e, element);});
        document.getElementById(`canvas_${element[0]}`).addEventListener("click", function (e){ setCanvas(e, element); }); 
    
  
    });

    
    
    function calcPerformAll(){
        let total = 0;
        let All = [];
        for(let i = 0; i < 5; i++){
            total = performance[i].reduce((s, v) => s + v, 0);
            document.getElementById(`perform_num_${MEMBER[i]}`).textContent = total;

            All.push(parseInt(document.getElementsByClassName("perform_num")[i+1].textContent));
        }

        document.getElementById(`perform_num_all`).textContent = All.reduce((s, v) => s + v, 0);
    }

    function focus(element){
        FOCUS[0] = element[0];

        for(let i = 0; i <= 4; i++){
            document.getElementById(`member_${WAKU[i][0]}`).style.setProperty("--focus", "0");

            if(FOCUS[0] == WAKU[i][0]){
                document.getElementById(`member_${FOCUS[0]}`).style.setProperty("--focus", "2px solid black");
            }
        }
    }

    function setImage(waku, name, imageLink, perform, master, canvas){
        let frame = MEMBER.indexOf(waku[0]);
        document.getElementById(`member_${waku}`).style.backgroundImage = `url(${imageLink})`;
        document.getElementById(`perform_num_${waku}`).textContent = perform;

        performance[frame][0] = perform;
        performance[frame][1] = master;
        performance[frame][2] = canvas;

        FRAMES[frame] = name

        CARDS.forEach(function(v, i){
            if(FRAMES.some(ele => ele == v[i+1].Name)){
                document.getElementById(`card${i}`).style.filter = `grayscale(100%)`
                document.getElementById(`card${i}`).style.pointerEvents = `none`
            }
        })

        /*for(let i = 0; i < CARDS.length; i++){
            
        }*/

        calcPerformAll();

        

        /*if(trained){
            if(!element[1]){
                element[1] = 1;
                
            } else {
                element[1] = 0;
                document.getElementById(`member_${waku}`).style.backgroundImage = "url('https://static.wikitide.net/projectsekaiwiki/0/09/Airi_4_trained_thumbnail.png')"
                document.getElementById(`perform_num_${waku}`).textContent = TEST[0][1]
            }
        } else {*/
         
        
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

        let RANK = parseInt(document.getElementById(`master_${element[0]}`).textContent);
        let Index = MEMBER.indexOf(element[0]);
        performance[Index][1] = MasterRank(WAKU[Index][1], RANK);
        calcPerformAll();
        event.stopPropagation();
    }

    function setCanvas(event, element){
        focus(element);

        if(!element[2]){
            element[2] = 1;
            document.getElementById(`canvas_${element[0]}`).style.backgroundImage = "url('../images/canvas_yes.png')"
            document.getElementById(`canvas_${element[0]}`).textContent = 1
        } else {
            element[2] = 0;
            document.getElementById(`canvas_${element[0]}`).style.backgroundImage = "url('../images/canvas_no.png')"
            document.getElementById(`canvas_${element[0]}`).textContent = 0
        }
        
        let RANK = parseInt(document.getElementById(`canvas_${element[0]}`).textContent);
        let Index = MEMBER.indexOf(element[0]);
        performance[Index][2] = CanvasRank(WAKU[Index][1], RANK);
        calcPerformAll();
        event.stopPropagation();
    }

    fetch("./member_db.json")
        .then(function(res){
            const CardJson = JSON.parse(JSON.stringify(res.text()));
    
            console.log(CardJson);
        });
        
    
    function MasterRank(rare, rank){
        let mul = 0;
        switch(rare){
            case 1: mul = rank * 150; break;
            case 2: mul = rank * 300; break;
            case 3: mul = rank * 450; break;
            case 4: mul = rank * 600; break;
            case 5: mul = rank * 540; break;
        }

        return mul;
    }

    function CanvasRank(rare, canvas){
        let mul = 0;
        if(canvas){
            switch(rare){
                case 1: mul = 300; break;
                case 2: mul = 600; break;
                case 3: mul = 900; break;
                case 4: mul = 1500; break;
                case 5: mul = 1200; break;
            }
        }

        return mul;
    }
    
    function setCard(json){
        let cards = document.getElementById('cards');
        for(let i = 0; i < Object.keys(json).length; i++){
            let new_card = document.createElement('div');
            new_card.className = "card";
            new_card.id = `card${i}`;
            new_card.textContent = `${json[i][i+1].Rarity};${json[i][i+1].Performance}`;
            new_card.style.backgroundImage = `url(${json[i][i+1].ImageLink})`;
            

            cards.appendChild(new_card);
        }

        for(let c = 0; c < document.getElementsByClassName("card").length; c++){
            document.getElementsByClassName("card")[c].addEventListener("click", () => {
                let rare = json[c][c+1].Rarity;
                let Master = document.getElementById(`master_${FOCUS}`).textContent;
                setImage(FOCUS, json[c][c+1].Name, json[c][c+1].ImageLink, json[c][c+1].Performance, MasterRank(rare, Master), CanvasRank(rare, WAKU[MEMBER.indexOf(FOCUS[0])][2]));
                WAKU[MEMBER.indexOf(FOCUS[0])][1] = json[c][c+1].Rarity;
                
            });
      
        }
        
        calcPerformAll();
    }
          
}