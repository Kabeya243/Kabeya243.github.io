// Données des œuvres
const artworks = [
    {
      title: "Sankofa",
      image: "./images/works/sankofa.webp",
      alt: "8"
    },
    {
      title: "Feline Look",
      image: "./images/works/felinelook.webp",
      alt: "5"
    },
    {
      title: "Angelic",
      image: "./images/works/Angelic.webp",
      alt: "6"
    },
    {
      title: "Immaculate",
      image: "./images/works/immaculate.webp",
      alt: "7"
    },
    {
      title: "Scarfed",
      image: "./images/works/scarfed.webp",
      alt: "9"
    },
    {
      title: "Unknown",
      image: "./images/works/unknown.webp",
      alt: "10"
    },
    {
      title: "Authenticity 1",
      image: "./images/works/authenticity1.webp",
      alt: "1"
    },
    {
      title: "Authenticity 2",
      image: "./images/works/authenticity2.webp",
      alt: "2"
    },
    {
      title: "Dream in a Blue Sun",
      image: "./images/works/Dream-in-a-blue-sun.webp",
      alt: "3"
    },
    {
      title: "Insecure",
      image: "./images/works/insecure.webp",
      alt: "4"
    }
  ];
  
  // Génération dynamique de la grille
  document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.querySelector('.grid-single');
    if (!gridContainer) return;
  
    const gridSizer = document.createElement('div');
    gridSizer.classList.add('grid-sizer');
    gridContainer.appendChild(gridSizer);
  
    artworks.forEach(art => {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
  
      const link = document.createElement('a');
      link.href = art.image;
      link.setAttribute('data-effect', 'mfp-zoom-in');
  
      const img = document.createElement('img');
      img.classList.add('b-lazy');
      img.setAttribute('data-src', 'images/frame-album-2.jpg'); // miniature
      img.src = art.image;
      img.alt = art.alt;
  
      link.appendChild(img);
      gridItem.appendChild(link);
      gridContainer.appendChild(gridItem);
    });
  
    // Réinitialisation de Blazy et Masonry
    if (typeof Blazy === 'function') new Blazy();
  
    if (typeof imagesLoaded === 'function' && typeof Masonry === 'function') {
      imagesLoaded(gridContainer, function () {
        new Masonry(gridContainer, {
          itemSelector: '.grid-item',
          columnWidth: '.grid-sizer',
          percentPosition: true
        });
      });
    }
  });
// fin gallery-single page 

// gallerie principale page elements
const albumsData = {
    animals: [
      {
        title: "Untitled I",
        image: "./images/works/sankofa.webp",
        alt: "sankofa",
        size: "89cm x 89cm",
        medium: "charcoals, oil paint and acrylics on paper",
        year: "2025"
      },
      {
        title: "Authenticity I",
        image: "./images/works/authenticity1.webp",
        alt: "authenticity1",
        size: "120cm x 89cm",
        medium: "charcoals on paper",
        year: "2024"
      },
      {
        title: "Feline look",
        image: "./images/works/felinelook.webp",
        alt: "felinelook",
        size: "120cm x 89cm",
        medium: "charcoals and pastels on paper",
        year: "2024"
      },
      {
        title: "Authenticity II",
        image: "./images/works/authenticity2.webp",
        alt: "authenticity2",
        size: "120cm x 89cm",
        medium: "charcoals and acrylics on paper",
        year: "2024 - 2025"
      },
      {
        title: "Dream in a blue sun",
        image: "./images/works/Dream-in-a-blue-sun.webp",
        alt: "Dream-in-a-blue-sun",
        size: "120cm x 89cm",
        medium: "charcoals and acrylics on paper",
        year: "2025"
      },
      {
        title: "Insecure",
        image: "./images/works/insecure.webp",
        alt: "insecure",
        size: "120cm x 89cm",
        medium: "charcoals and acrylics on paper",
        year: "2026"
      },
      {
        title: "Angelic",
        image: "./images/works/Angelic.webp",
        alt: "Angelic",
        size: "90cm x 60cm",
        medium: "charcoals on paper",
        year: "2023"
      },
      {
        title: "Immaculate",
        image: "./images/works/immaculate.webp",
        alt: "immaculate",
        size: "90cm x 60cm",
        medium: "charcoals on paper",
        year: "2023"
      }
    ],
  
    nature: [
      {
        title: "Expression I",
        image: "./images/exhibitions/makerere1.JPG",
        alt: "Expression I",
        desc: "A group Exhibition at Makerere Art Gallery in Kampala, Uganda."
      }
    ],
  
    portraits: [
      {
        title: "Metamorphosis 1",
        image: "./images/exhibitions/metamorphosis1.JPG",
        alt: "metamorphosis",
        desc: "Kiggundu Art Studio | January 2025"
      },
      {
        title: "Group show",
        image: "./images/exhibitions/droop1.JPG",
        alt: "droopcanvas",
        desc: "Droop Canvas | February 2025"
      },
      {
        title: "Metamorphosis 2",
        image: "./images/exhibitions/metamorphosis2.JPG",
        alt: "metamorphosis",
        desc: "Kiggundu Art Studio | January 2025"
      },
      {
        title: "Metamorphosis 3",
        image: "./images/exhibitions/metamorphosis3.JPG",
        alt: "metamorphosis",
        desc: "Kiggundu Art Studio | January 2025"
      },
      {
        title: "Metamorphosis 4",
        image: "./images/exhibitions/metamorphosis4.JPEG",
        alt: "metamorphosis",
        desc: "Kiggundu Art Studio | January 2025"
      },
      {
        title: "Metamorphosis 5",
        image: "./images/exhibitions/metamorphosis16.JPEG",
        alt: "metamorphosis",
        desc: "Kiggundu Art Studio | February 2025"
      },
      {
        title: "Metamorphosis 6",
        image: "./images/exhibitions/metamorphosis17.JPEG",
        alt: "metamorphosis",
        desc: "Kiggundu Art Studio | February 2025"
      },
      {
        title: "Metamorphosis 7",
        image: "./images/exhibitions/metamorphosis20.JPEG",
        alt: "metamorphosis",
        desc: "Kiggundu Art Studio | February 2025"
      },
      {
        title: "Metamorphosis 8",
        image: "./images/exhibitions/metamorphosis23.JPEG",
        alt: "metamorphosis",
        desc: "Kiggundu Art Studio | February 2025"
      },
      {
        title: "Metamorphosis 9",
        image: "./images/exhibitions/metamorphosis10.JPEG",
        alt: "metamorphosis",
        desc: "Kiggundu Art Studio | February 2025"
      },
      {
        title: "Metamorphosis 10",
        image: "./images/exhibitions/metamorphosis5.JPG",
        alt: "metamorphosis",
        desc: "Kiggundu Art Studio | January 2025"
      }
    ],
  
    kids: [
      {
        title: "Playful Adventures",
        image: "./images/frame-album-1.jpg",
        alt: "Playful Adventures",
        desc: "A joyful collection of candid shots capturing the lively and carefree spirit of children."
      }
    ]
  };
  // gallery-render.js

document.addEventListener("DOMContentLoaded", () => {
    function createWorkBox(item) {
      return `
        <div class="grid-item album-item">
          <a href="gallery-single.html">
            <div class="album-thumb">
              <img src="${item.image}" loading="lazy" alt="${item.alt}" />
            </div>
            <div class="album-name">${item.title}</div>
            <div class="album-desc">
              size : ${item.size} <br>
              medium : ${item.medium} <br>
              year : ${item.year}
            </div>
          </a>
        </div>
      `;
    }
  
    function createSimpleBox(item) {
      return `
        <div class="grid-item album-item">
          <a href="gallery-single.html">
            <div class="album-thumb">
              <img src="${item.image}" loading="lazy" alt="${item.alt}" />
            </div>
            <div class="album-name">${item.title}</div>
            <div class="album-desc">
              ${item.desc}
            </div>
          </a>
        </div>
      `;
    }
  
    const containers = {
      animals: document.getElementById("album-animals"),
      nature: document.getElementById("album-nature"),
      portraits: document.getElementById("album-portraits"),
      kids: document.getElementById("album-kids")
    };
  
    Object.entries(albumsData).forEach(([key, items]) => {
      if (!containers[key]) return;
  
      const gridSizer = '<div class="grid-sizer"></div>';
      let html = gridSizer;
  
      items.forEach(item => {
        html += key === "animals" ? createWorkBox(item) : createSimpleBox(item);
      });
  
      containers[key].innerHTML = html;
    });
  });
  
// gallerie principale page elements