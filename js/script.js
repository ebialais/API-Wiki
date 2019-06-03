window.onload = function (){


    document.getElementById('form').addEventListener('submit', Request);

    function Request (e){
        e.preventDefault();
        document.getElementById('résultats').innerHTML = "";

        let input = document.getElementById('input').value;
        const req = new XMLHttpRequest();
        req.open('GET', 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+input);
        req.send();
        

        req.onload = function () {

            let data = JSON.parse(this.response)

            let main = document.createElement('div');
            document.getElementById('résultats').appendChild(main);

            let mainTxt = document.createElement('h2')
            main.appendChild(mainTxt)
            mainTxt.textContent = "Your search was: " + data[0] + ".";

            for (let i in data[1]) {
                //faire apparaitre une nouvelle div qui va contenir le background decalé 
                let resultBG = document.createElement('section');
                main.appendChild(resultBG);

                // faire une nouvelle div dans laquelle les resultats vont se mettre
                let result = document.createElement('div');
                resultBG.appendChild(result);

                // y ajouter un nouveau titre
                let resultH3 = document.createElement('h3');
                result.appendChild(resultH3);
                resultH3.textContent = data[1][i];

                // y mettre le contenu sous forme de paragraphe
                let resultP = document.createElement('p');
                result.appendChild(resultP);
                resultP.textContent = data[2][i];

                // ajouter le lien
                let resultLink = document.createElement('a');
                result.appendChild(resultLink);
                resultLink.textContent = "Wikipedia";
                resultLink.href = data[3][i];
                resultLink.target = '_blank';
                resultLink.role = 'button';

                // Ajout class pour bootstrap
                main.className = "container";
                resultBG.className = "resultBG";
                result.className = "jumbotron";
                resultP.className = "lead";
                resultH3.className = "display-4";
                resultLink.className = "btn btn-success btn-lg";

                if (i % 2 ===0) {
                    resultBG.style.transform = 'translateX(-10%)';
                } else {
                    resultBG.style.transform = 'translateX(8%)';
                }

            
            };
        }
    }
}