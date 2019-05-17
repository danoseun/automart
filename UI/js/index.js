

function buyNow(e){
    let tgt = e.target
    let parentDiv = tgt.parentNode.parentNode.parentNode.id
    let price = document.querySelector('#' + parentDiv + ' ' + '.price').innerHTML;
    let form = document.querySelector('.viewOform').classList.add('viewForm')
    let formPrice = document.querySelector('.viewOform #price').value = price;
    // alert(price)
    
    }
    
    function closeOrder(){
      
        document.querySelector('.viewOform').classList.add('close-modal');
      
        setTimeout(()=>{
            document.querySelector('.viewOform').classList.remove('viewForm');
            document.querySelector('.viewOform').classList.remove('close-modal');
        },1500)
    
        (function remInterval(){
        clearTimeout()
    })();
        
    }
    
    
    
    function viewDetail(e){
        let tgt = e.target
        let parentDiv = tgt.parentNode.parentNode.parentNode.id
        let price = document.querySelector('#' + parentDiv + ' ' + '.price').innerHTML;
        let model = document.querySelector('#' + parentDiv + ' ' + '.model').innerHTML;
        
        let src = document.querySelector('#' + parentDiv + ' ' + '.img').src;
        let form = document.querySelector('.viewDform').classList.add('viewForm')
        let formPrice = document.querySelector('.detail .price').innerHTML = price;
        let formModel = document.querySelector('.detail .model').innerHTML = model;
        let formBody = document.querySelector('.detail .b-type').innerHTML = model;
        let formManufacturer = document.querySelector('.detail .manufacturer').innerHTML = model;
        let formImg = document.querySelector('.detail .img').src = src;
        // alert(price)
        
        }
        
        function closeDetail(){
           
            document.querySelector('.viewDform').classList.add('close-modal');
      
            setTimeout(()=>{
                document.querySelector('.viewDform').classList.remove('viewForm');
                document.querySelector('.viewDform').classList.remove('close-modal');
            },1500)
        
            (function remInterval(){
            clearTimeout()
        })();
        }
    
    
    
    
        function flagAdvert(e){
            let tgt = e.target
            let form = document.querySelector('.viewFform').classList.add('viewForm')
            document.querySelector('.viewDform').classList.remove('viewForm')
            
            }
    
            function closeFlag(){
                
                document.querySelector('.viewFform').classList.add('close-modal');
      
                setTimeout(()=>{
                    document.querySelector('.viewFform').classList.remove('viewForm');
                    document.querySelector('.viewFform').classList.remove('close-modal');
                },1500)
            
                (function remInterval(){
                clearTimeout()
            })();
            }
    
            const introductions = [
                "Welcome to Auto Mart",
                "Auto Mart is an online marketplace for automobiles of diverse makes, model or body type.",
                "With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers. "
            ];
            
            const loadIntroTexts = () => {
              introductions.forEach((intro, index, introArr) => {
                let appIntro = document.querySelector('#welcome');
                appIntro.innerHTML = introArr[index++ % introArr.length];
                setInterval(() => {
                  appIntro.innerHTML = introArr[index++ % introArr.length];
                }, 8000);
              });
            }
            window.onload = loadIntroTexts();