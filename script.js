document.addEventListener("DOMContentLoaded", function () {
    const cactusLink = document.getElementById("cactus-lady"); // Ensure the link has this ID

    if (cactusLink) {
        cactusLink.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "cactus-question.html"; // New page
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll(".nav-item");
    // Retrieve last active tab from localStorage
    const activeTab = localStorage.getItem("activeTab");

    // Remove "active" class from all tabs
    navItems.forEach(tab => tab.classList.remove("active"));

    // If there's a stored active tab, add the "active" class
    if (activeTab) {
        document.querySelector(`.nav-item[href='${activeTab}']`)?.classList.add("active");
    }

    // Add click event to each nav item
    navItems.forEach(tab => {
        tab.addEventListener("click", function (event) {
            // Store the clicked tab in localStorage
            localStorage.setItem("activeTab", this.getAttribute("href"));

            // Remove active class from all tabs
            navItems.forEach(tab => tab.classList.remove("active"));

            // Add active class to clicked tab
            this.classList.add("active");
        });
    });
});

// Function to set active tab
function setActiveTab(tab) {
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active"); // Remove active from all
    });
    tab.classList.add("active"); // Add active to clicked tab
}

// Apply active state when clicking navigation links
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        let targetURL = this.href;

        setActiveTab(this); // Keep effect on clicked tab

        setTimeout(() => {
            window.location.href = targetURL;
        }, 300);
    });
});

// Keep active tab on page reload
document.addEventListener("DOMContentLoaded", function() {
    let currentPage = window.location.pathname;
    document.querySelectorAll(".nav-links a").forEach(link => {
        if (link.getAttribute("href").includes(currentPage)) {
            setActiveTab(link);
        }
    });
});


function toggleDropdown() {
    let dropdown = document.getElementById("dropdown-menu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}
function applyFilters() {
    let minDiff = document.getElementById("min-difficulty").value;
    let maxDiff = document.getElementById("max-difficulty").value;
    
    let rows = document.querySelectorAll("#problems-body tr");
    rows.forEach(row => {
        let diff = parseInt(row.children[2].innerText);
        if ((minDiff && diff < minDiff) || (maxDiff && diff > maxDiff)) {
            row.style.display = "none";
        } else {
            row.style.display = "";
        }
    });
}


function updateTable(option) {
    let ratings = document.getElementsByClassName("rating");
    let problems = document.getElementsByClassName("problems");
    let ratingHeader = document.getElementById("rating-header");
    let problemsHeader = document.getElementById("problems-header");
    let selectedDate = document.getElementById("selected-date");
    let names = document.querySelectorAll(".ranking-table tbody td:nth-child(3)");
    let images = document.querySelectorAll(".ranking-table tbody img");
    let weeksInTop10 = document.querySelectorAll(".ranking-table tbody td:nth-child(4)");

    // Preload images
    function preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => reject(url);
            img.src = url;
        });
    }

    if (option === "all") {
        selectedDate.innerText = "Global | All Time";
        ratingHeader.innerText = "Rating (All Time)";
        problemsHeader.innerText = "Problems Solved (All Time)";

        let allTimeRatings = [100, 200, 300, 400];
        let allTimeProblems = [100, 200, 300, 400];
        let allTimeNames = ["Name 5", "Name 6", "Name 7", "Name 8"];
        let allTimeImages = [
            "https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/LOGO%2F20250111_135009.png?alt=media&token=7f115332-fb03-4ba1-a01e-0dd988307604",
            "https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/LOGO%2F20250111_135009.png?alt=media&token=7f115332-fb03-4ba1-a01e-0dd988307604",
            "https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/LOGO%2F20250111_135009.png?alt=media&token=7f115332-fb03-4ba1-a01e-0dd988307604",
            "https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/LOGO%2F20250111_135009.png?alt=media&token=7f115332-fb03-4ba1-a01e-0dd988307604"
        ];
        let allTimeWeeks = [5, 7, 8, 9];

        // Preload all images before updating
        Promise.all(allTimeImages.map(url => preloadImage(url)))
            .then(() => {
                for (let i = 0; i < ratings.length; i++) {
                    ratings[i].innerText = allTimeRatings[i];
                    problems[i].innerText = allTimeProblems[i];
                    names[i].innerText = allTimeNames[i];
                    images[i].src = allTimeImages[i];
                    weeksInTop10[i].innerText = allTimeWeeks[i];
                }
            });
    } else {
        selectedDate.innerText = "Global | 20 Jan - 26 Jan";
        ratingHeader.innerText = "Rating (This Week)";
        problemsHeader.innerText = "Problems Solved (This Week)";

        let weeklyRatings = [822, 912, 550, 322];
        let weeklyProblems = [27, 24, 21, 32];
        let weeklyNames = ["Name 1", "Name 2", "Name 3", "Name 4"];
        let weeklyImages = [
            "https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/iTHiNK%2FNewCandidateImage%20(1).jpg?alt=media&token=902d7e87-21e1-42f2-9a44-63d45fea12fb",
            "https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/iTHiNK%2FNewCandidateImage%20(1).jpg?alt=media&token=902d7e87-21e1-42f2-9a44-63d45fea12fb",
            "https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/iTHiNK%2FNewCandidateImage%20(1).jpg?alt=media&token=902d7e87-21e1-42f2-9a44-63d45fea12fb",
            "https://firebasestorage.googleapis.com/v0/b/mentorsmantratestportal1.appspot.com/o/iTHiNK%2FNewCandidateImage%20(1).jpg?alt=media&token=902d7e87-21e1-42f2-9a44-63d45fea12fb"
        ];
        let weeklyWeeks = [1, 2, 3, 4];

        // Preload all images before updating
        Promise.all(weeklyImages.map(url => preloadImage(url)))
            .then(() => {
                for (let i = 0; i < ratings.length; i++) {
                    ratings[i].innerText = weeklyRatings[i];
                    problems[i].innerText = weeklyProblems[i];
                    names[i].innerText = weeklyNames[i];
                    images[i].src = weeklyImages[i];
                    weeksInTop10[i].innerText = weeklyWeeks[i];
                }
            });
    }

    toggleDropdown();
}