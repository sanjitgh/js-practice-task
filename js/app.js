const loadAllPhone = async (status, searchText) => {
    document.getElementById('loading-state').style.display = "none";

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : 'iphone'}`);
    const data = await response.json();
    if (status) {
        displayAllPhone(data.data);
    }
    else {
        displayAllPhone(data.data.slice(0, 6))
    }
}



const displayAllPhone = (phones) => {
    const phoneContainer = document.getElementById('phones-container');
    phones.forEach(phone => {
        const { brand, image, phone_name, slug } = phone;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card m-2 shadow-xl">
            <figure class="px-10 pt-10">
                <img
                src="${image}"/>
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${brand}</h2>
                <p>${phone_name}</p>
                <div class="card-actions">
                <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        </div>
        `;
        phoneContainer.appendChild(div)
    });
}



const handelShowAll = () => {
    loadAllPhone(true);
}


// click search button
const handelSearch = () => {
    document.getElementById('loading-state').style.display = "flex";
    const searchText = document.getElementById("search-box").value;

    setTimeout(function () {
        loadAllPhone(false, searchText)
    }, 3000)
}

// {
//     "storage": "128GB/256GB/512GB storage, no card slot",
//     "displaySize": "5.4 inches, 71.9 cm2 (~85.1% screen-to-body ratio)",
//     "chipSet": "Apple A15 Bionic (5 nm)",
//     "memory": "128GB 4GB RAM, 256GB 4GB RAM, 512GB 4GB RAM",
//     "sensors": [
//         "Face ID",
//         "accelerometer",
//         "gyro",
//         "proximity",
//         "compass",
//         "barometer"
//     ]
// }
const phoneDetails = async (slugs) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/phone/${slugs}`)
    const data = await response.json();
    const { brand, name, releaseDate } = data.data;
    const { storage, displaySize, chipSet, memory, sensors } = data.data.mainFeatures;
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
        <form method="dialog">
            <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
            ✕
            </button>
        </form>
        <h3 class="text-lg font-bold">${brand}</h3>
        <p class="py-2">${name}</p>
        <p class="py-2">${storage}</p>
        <p class="py-2">${displaySize}</p>
        <p class="py-2">${chipSet}</p>
        <p class="py-2">${memory}</p>
        <p class="py-2">Sernsors: ${sensors}</p>
        </div>
    </dialog>
    `
    my_modal_3.showModal()
}

// function call
loadAllPhone(false, 'iphone')