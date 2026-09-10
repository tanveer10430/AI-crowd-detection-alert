function startMonitoring() {

    const capacity =
        document.getElementById("capacityInput").value;

    if (capacity <= 0) {
        alert("Please enter a valid stadium capacity.");
        return;
    }

    document.getElementById("capacity").innerText =
        Number(capacity).toLocaleString();

    document.getElementById("setupModal").style.display =
        "none";

    const people = 0;

    const occupancy =
        (people / capacity) * 100;

    const remaining =
        capacity - people;

    document.getElementById("people").innerText =
        people;

    document.getElementById("occupancy").innerText =
        occupancy.toFixed(1) + "%";

    document.getElementById("remaining").innerText =
        remaining.toLocaleString();
}


async function uploadVideo() {

    const videoInput =
        document.getElementById("videoInput");

    const video = videoInput.files[0];

    if (!video) {
        alert("Please select a video first.");
        return;
    }

    const formData = new FormData();

    formData.append("video", video);

    const response = await fetch(
        "http://127.0.0.1:5000/upload-video",
        {
            method: "POST",
            body: formData
        }
    );

    const result = await response.json();

    console.log(result);

    // REMOVE THESE OLD TWO LINES
    // const people = result.people;
    // document.getElementById("people").innerText = people;
}


// CHECK FLASK EVERY 1 SECOND

setInterval(updateDashboard, 2000);



async function updateDashboard() {

    const response = await fetch(
        "http://127.0.0.1:5000/api/person-count"
    );

    const data = await response.json();

    const people = data.people;

    const capacity =
        Number(document.getElementById("capacityInput").value);

    const occupancy =
        (people / capacity) * 100;

    const remaining =
        Math.max(capacity - people, 0);
          let status;

    if (people > capacity) {
        status = "Overcrowded";
    } else {
        status = "Safe";
    }

    document.getElementById("people").innerText =
        people;

    document.getElementById("occupancy").innerText =
        occupancy.toFixed(1) + "%";

    document.getElementById("remaining").innerText =
        remaining.toLocaleString();

    console.log(
        "People:", people,
        "| Occupancy:", occupancy.toFixed(1) + "%",
        "| Remaining:", remaining,
        "| status",status
    );
}