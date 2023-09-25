const MAPS_KEY = 'e5m1Pm0NRFjmUgKaFDCnMVJOfZqBoyh9aEkQttCzs8w';

const area = document.getElementById('area');
const areaCtx = area ? area.getContext('2d') : undefined;
const pagination = document.querySelector('.pagination');
const content = document.querySelector('#content');
const popup = document.querySelector('.popup');

function showMap() {
    document.getElementById('map_content').style.width = '100%';
    document.getElementById('map_content').style.height = '30rem';
    
    const platform = new H.service.Platform({
        'apikey': MAPS_KEY
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(
        document.getElementById('map_content'),
        defaultLayers.vector.normal.map,
        {
            zoom: 10,
            center: { lat: 22.9734, lng: 78.6569 }
        }
    );

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 768) {
        document.getElementById('toggle_sidebar').classList.add('offcanvas');
    }

    if (localStorage.getItem('toListingDetails') === 'true') {
        localStorage.removeItem('toListingDetails');
        showDetails({}, 'details');
    }
    addAnimations();
});

function addAnimations() {
    gsap.from('#sidebar', {
        x: '-2rem',
        opacity: 0,
        duration: 1
    });

    gsap.from('#header', {
        y: '-2rem',
        opacity: 0,
        duration: 1
    });

    gsap.from('.stagger', {
        y: '-2rem',
        opacity: 0,
        stagger: 0.1
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        // document.getElementById('sidebar').style.display = 'none';
        document.getElementById('toggle_sidebar').classList.add('offcanvas');
    } else {
        document.getElementById('sidebar').style.display = 'block';
        document.getElementById('toggle_sidebar').classList.remove('offcanvas');
    }
});

function showStars() {
    const stars = new StarRating('.star-rating', { tooltip: null });

    const five = new ProgressBar.Line('.five', {
        color: '#09338F',
        fill: '#09338F',
        strokeWidth: 3,
        trailWidth: 2,
        vertical: false,
        text: {
            value: '5 Stars',
            style: {
                color: '#000',
                position: 'absolute',
                right: '-5rem',
                top: '-0.5rem',
                bottom: '0',
                margin: 0,
                padding: 0,
                transform: null,
                fontWeight: 700
            }
        }
    });

    five.animate(0.9);

    const four = new ProgressBar.Line('.four', {
        color: '#09338F',
        fill: '#09338F',
        strokeWidth: 3,
        trailWidth: 2,
        vertical: false,
        text: {
            value: '4 Stars',
            style: {
                color: '#000',
                position: 'absolute',
                right: '-5rem',
                top: '-0.5rem',
                bottom: '0',
                margin: 0,
                padding: 0,
                transform: null,
                fontWeight: 700
            }
        }
    });

    four.animate(0.8);

    const three = new ProgressBar.Line('.three', {
        color: '#09338F',
        fill: '#09338F',
        strokeWidth: 3,
        trailWidth: 2,
        vertical: false,
        text: {
            value: '3 Stars',
            style: {
                color: '#000',
                position: 'absolute',
                right: '-5rem',
                top: '-0.5rem',
                bottom: '0',
                margin: 0,
                padding: 0,
                transform: null,
                fontWeight: 700
            }
        }
    });

    three.animate(0.2);

    const two = new ProgressBar.Line('.two', {
        color: '#09338F',
        fill: '#09338F',
        strokeWidth: 3,
        trailWidth: 2,
        vertical: false,
        text: {
            value: '2 Stars',
            style: {
                color: '#000',
                position: 'absolute',
                right: '-5rem',
                top: '-0.5rem',
                bottom: '0',
                margin: 0,
                padding: 0,
                transform: null,
                fontWeight: 700
            }
        }
    });

    two.animate(0.2);
    const one = new ProgressBar.Line('.one', {
        color: '#09338F',
        fill: '#09338F',
        strokeWidth: 3,
        trailWidth: 2,
        vertical: false,
        text: {
            value: '1 Stars',
            style: {
                color: '#000',
                position: 'absolute',
                right: '-5rem',
                top: '-0.5rem',
                bottom: '0',
                margin: 0,
                padding: 0,
                transform: null,
                fontWeight: 700
            }
        }
    });

    one.animate(0.1);
}

function verticalAnimate(element, visible) {
    const el = element;
    if (typeof element === 'string') el = document.querySelector(element);
    if (visible) {
        gsap.to(el, {
            y: '2rem',
            duration: 0.5,
            opacity: 0,
            onComplete() {
                el.classList.add('hide');
                el.style.opacity = '1';
            }
        });
    } else {
        gsap.to(el, {
            display: 'flex',
            y: 0,
            duration: 0.5,
            onComplete() {
                el.classList.remove('hide');
                el.style.transform = 'translate(2rem, 2rem)';
            }
        });
    
        gsap.from(el, {
            y: '-2rem',
            opacity: 0,
            delay: 0.5,
            duration: 0.5
        });
    }
}

function showDetails(e, action) {
    if (action === 'details') {
        verticalAnimate(content.querySelector('.row:nth-child(2)'), true)
        verticalAnimate(content.querySelector('#details_content'), false)
    } else if (action === 'report') {
        popup.style.display = 'block';
        popup.classList.remove('hide');
        gsap.from(popup, {
            y: '-2rem',
            opacity: 0,
            duration: 0.5
        });
    } else if (action === 'back') {
        verticalAnimate(content.querySelector('#details_content'), true)
        verticalAnimate(content.querySelector('.row:nth-child(2)'), false)
    } else if (action === 'close_popup') {
        gsap.to(popup, {
            y: '2rem',
            opacity: 0,
            duration: 0.5,
            onComplete() {
                popup.classList.add('hide');
                popup.style.opacity = 1;
            }
        });
    }
}

async function changePageListing(e) {
    e.stopPropagation();

    e.currentTarget.querySelectorAll('.page-link').forEach(link => {link.classList.remove('active')});
    e.target.classList.add('active');
    
    const start = parseInt(e.target.innerText - 1) * 5;
    const end = start + 5;

    let currentTab;
    document.querySelectorAll('.table_nav .nav-link').forEach(tab => {
        if (tab.classList.contains('active')) {
            currentTab = tab.getAttribute('data-bs-target');
            console.log(currentTab);
        }
    });

    if (currentTab) {
        const listings = document.querySelectorAll(`${ currentTab } #listing`);

        await gsap.to(listings, {
            y: '-2rem',
            opacity: 0,
            stagger: 0.1,
            onComplete() {
                listings.forEach(listing => {
                    listing.style.transform = 'translate(0px, 0px)';
                    listing.style.setProperty('display', 'none', 'important');
                });
            }
        });

        listings.forEach((listing, i) => {
            if (i >= start && i < end) {
                listing.style.setProperty('display', 'flex', 'important');
                gsap.to(listing, {
                    opacity: 1
                });
            }
        });
    }
}