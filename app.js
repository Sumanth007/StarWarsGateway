const APP = {
    //call the APP.urls.base to see the contents of APP.urls
    urls: {
      base: 'https://swapi.dev/api/',
      planets: 'planets/',
    },
    init: () => {
      APP.addListeners();
      APP.buildNav();
    },
    addListeners: () => {
      let nav = document.getElementById('nav');
      nav.addEventListener('click', APP.getData);
      footer.addEventListener('click', APP.getData);
    },
    buildNav: () => {
        let bn = document.createElement('button');
        let nav = document.getElementById('nav'); // Get the nav element
        let link = document.createElement('a'); // Create a new <a> element
        bn.href = `${APP.urls.base}${APP.urls[APP.urls.planets]}`; // Set the href attribute
        link.textContent = 'OUR PLANETS'; // Set the text content
        link.classList.add('button'); // Add the 'button' class for styling
        link.setAttribute('data-link', `${APP.urls.base}${APP.urls['planets']}`); // Set the data-link attribute
        bn.append(link);
        bn.style.width = '200px';
        bn.style.height = '30px';
        bn.style.color = 'black';
        bn.style.font = 'italic bold 20px arial,serif';
        bn.style.backgroundColor = '#eda6e4';
        
        // Append the link to the nav element
        nav.appendChild(bn);
    },
    getData: (ev) => {
      if (ev) ev.preventDefault();
      document.querySelector('.overlay').classList.add('active');
      let link = ev.target;
      let url = link.getAttribute('data-link');
      fetch(url)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then(APP.buildList)
        .catch((err) => {
          console.error(err);
          document.querySelector('.overlay').classList.remove('active');
        });
    },
    // getInfo : function(nm){
    //     let url = nm
    //     return 'hello';
    // },
    buildList: (data) => {
      let m = document.getElementById('main');
      console.log(data);  
      document.querySelector('.overlay').classList.remove('active');
      m.innerHTML = data.results
        .map((item) => {
          let nm = item.name || item.title || item.name;
          return `<h4>${nm}</h4>`;
        })
        .join(' ');
      let footer = document.getElementById('footer');
      footer.innerHTML = '';
  
      if (data.previous) {
        let bn = document.createElement('button');
        let prev = document.createElement('a');
        prev.href = data.previous;
        let url = new URL(data.previous);
        let labels = url.pathname.split('/');
        let label = labels[labels.length - 2];
        prev.textContent = `<< Prev`;
        prev.setAttribute('data-link', data.previous);
        bn.append(prev);
        footer.append(bn);
      }
      if (data.next) {
        //next link
        let bn = document.createElement('button');
        let next = document.createElement('a');
        next.href = data.next;
        let url = new URL(data.next);
        let labels = url.pathname.split('/');
        let label = labels[labels.length - 2];
        next.textContent = `Next >>`;
        next.setAttribute('data-link', data.next);
        bn.append(next);
        footer.append(bn);
      }

      let buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.style.marginRight = '5px'; // Add margin to the right of each button
}); 
    },
  };
  
  document.addEventListener('DOMContentLoaded', APP.init);