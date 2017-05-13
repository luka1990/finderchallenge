
var input = document.getElementById("myinput");
var awesomplete = new Awesomplete(input);

document.addEventListener('DOMContentLoaded', function(){
    var searchKey = document.querySelector('input[type=text]');
        //Escuchador para detectar entrada de texto de el usuario en el input text box
        searchKey.addEventListener('keyup', function(event){
            clearResultsDiv();            if(searchKey.value.length === 0){
            }
            else{
                $.ajax({url: "data/books-schema.json"}).done(function(schema){
                    searchMyJSON(schema.data, searchKey.value);
					searchMyJSON(schema.entities, searchKey.value);
                }).fail(function(textStatus){
                    alert("Request failed: " + textStatus);
                });
            }
        });

    var insertListener = function(event){
        if (event.animationName == "nodeInserted") {
        }
    };
    document.addEventListener("animationstart", insertListener, false); // Firefox
    document.addEventListener("MSAnimationStart", insertListener, false); // IE
    document.addEventListener("webkitAnimationStart", insertListener, false); // Chrome y Safari
});

function searchMyJSON(data, searchKey){
    var searchResults = {},
        searchRegExp,
        searchKey = '\\b' + searchKey;

    searchRegExp = new RegExp(searchKey, 'i');
    data.map(function (item) {
        if(searchRegExp.test(item.title)){
            if(searchResults[item.categories]){
                searchResults[item.categories].push(item);
            }
            else{
                searchResults[item.categories] = [item];
            }
        }
    });
    createSearchResults(searchResults);
}

function createSearchResults(searchResults){
    var searchResultsDiv = document.getElementById('searchResults');
    if(Object.keys(searchResults).length === 0){
        searchResultsDiv.innerHTML = "<h4>No hay resultados encontrados</h4>";
    }else{
        Object.keys(searchResults).forEach(function(item){
            var h4  =createElement('h4',searchResultsDiv,null,item),
                ul =  createElement('ul',searchResultsDiv);
            searchResults[item].forEach(function(subitem){
                var liName = createElement('li',ul,'name_li', 'Title: '+subitem.title,null);
				var liTeaser = createElement('li',ul,'teaser_li', 'Teaser: '+subitem.teaser,null);
				var liDatePub = createElement('li',ul,'date-pub_li', 'Date Publication: '+subitem.date_pub,null);
				var liImage = createElement('img',ul,'image_li', subitem.date_pub, {'src': subitem.image});
            });
        });
    }
}

function createElement(element, parent, className, textcontent, attributes){
    var element = document.createElement(element);
    if (parent) parent.appendChild(element);
    if (className) element.className = className;
    if (textcontent) element.innerHTML = textcontent;
    if (typeof attributes !== 'undefined') {
        for (var attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
    }
    return element;
}

function clearResultsDiv(){
    document.getElementById('searchResults').innerHTML = "";
}
awesomplete.list = ["Devil At The Catacombs", "Angels Without A Mouth", "Fish Looking At Me", "Foreigners And Hunters", "Zombies And Horses", "Temptation Hiding From Me", "Working In My Nightmares", "Miserable Until The Light", "Sweating In The Dark", "Mutant Without A Mouth", "Butcher At The Catacombs", "Freaks Who Stare", "Wives Who Smiles", "Creatures And Owls", "Wolves And Colleagues", "Shadows In My Dreams", "Shadows In The Crypts", "Wretched In The Night", "Rotten In The Light", "Companion Program", "Jester Can Dance", "Angel Without A Voice", "Serpent Of Stunts", "Foreigner And Fool", "Angel And Butcher", "Whispers Arrangement", "Spoofs Adventure", "Impressed By Traditions", "Weight Of My Sister", "Harlequin Of Parody", "Thief From The Mountains", "Queen Of Parody", "Horse Can Cook", "Buffoon And Soldier", "Harlequin And Angel", "Jokes Stalks Me", "Gags From The River", "Delight Of The Truth", "Hidden By The Idiot", "Agent Of Stone", "Bandit Without A Goal", "Traitors Of Agony", "Deputies Of Doom", "Collectors And Friends", "Couriers And Warriors", "Chase Of The Stockades", "Execution Of The Plague", "Belonging To The Graveyard", "Dead At The Town", "Agent Of Stone", "Bandit Without A Goal", "Traitors Of Agony", "Deputies Of Doom", "Collectors And Friends", "Couriers And Warriors", "Chase Of The Stockades", "Execution Of The Plague", "Belonging To The Graveyard", "Dead At The Town"];
new Awesomplete(inputReference, {
	minChars: 3,
});
