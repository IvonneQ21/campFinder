let formName = document.getElementById('searchCamp');
let searchVal = document.getElementById('searchText');
let searchBtn = document.getElementById('costumerSearch');

searchBtn.addEventListener("click", function(eventTriggered){
eventTriggered.preventDefault();
let userInput = searchVal.value;
  campFinder(userInput);
});

function campFinder(zipCode) {
  let url =`https://data.sfgov.org/resource/94uf-amnx.json?zipcode=${zipCode}`;
  return fetch(url)
  .then(function(returnedPro) {
    return returnedPro.json();
  })
  .then(function(arrOfCamps) {
      //creating an array of modifed objects.
      let arrCampsObjs = arrOfCamps.map(function(obj) {
          let newObj = {};
          newObj.name = obj.parkname;
          newObj.type =obj.parktype;
          newObj.number = obj.number;
          newObj.email = obj.email;
          newObj.manager = obj.psamanager;

          return newObj;
          });

          for (let j = 0; j < arrCampsObjs.length; j++) {
              let curCampObj = arrCampsObjs[j];
            createAndAppendCampCard(curCampObj);
          }
      })
  }

  function createAndAppendCampCard(curCampObj){
    $('#results').empty();
    let campCard = createCard(curCampObj);
    let results = document.getElementById('results');
    appendToDom(results, campCard);

  }

  function appendToDom(results, campCard){
    return results.appendChild(campCard);
  }

  function createCard(curCampObj){
   let topDiv = document.createElement('div');
    topDiv.setAttribute('class', 'row `${z-depth-5}`');
    topDiv.setAttribute('id','eachCard');
   let secDiv = document.createElement('div');
    secDiv.setAttribute('class', 'col s12 m12');
   let thirdDiv = document.createElement('div');
    thirdDiv.setAttribute('class', 'card pink lighten-1');
   let fourthDiv = document.createElement('div');
    fourthDiv.setAttribute('class', 'card-content white-text');
   let innerInfo = document.createElement('span');
    innerInfo.setAttribute('class', 'card-title');
    innerInfo.innerText = curCampObj.name;
  let infoP = document.createElement('p');
    infoP.innerText = `Park name: ${curCampObj.name}\n Park type: ${curCampObj.type}\n Park manager: ${curCampObj.manager}\n Phone Number : ${curCampObj.number}\n  E-mail: ${curCampObj.email}\n `;

   topDiv.append(secDiv);
   secDiv.append(thirdDiv);
   thirdDiv.append(fourthDiv);
   fourthDiv.append(innerInfo);
   innerInfo.append(infoP);
   return topDiv;
 }
